import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const reqJson = await req.json();

  try {
    const { min, max } = reqJson;

    const minDate = new Date(min);
    const maxDate = new Date(max);

    const issues = await prisma.issue.findMany({
      where: {
        AND: [
          {
            createdAt: {
              gte: minDate,
            },
          },
          {
            updatedAt: {
              lte: maxDate,
            },
          },
        ],
      },
      select: {
        updatedAt: true,
        status: true,
      },
    });

    // Array to store all possible statuses
    const statuses = ["OPEN", "IN_PROGRESS", "ON_REVIEW", "ON_REWORK", "CLOSED"];

    // Helper function to generate an array of dates between two dates
    const generateDateArray = (minDate: Date, maxDate: Date) => {
      const dates: string[] = [];
      for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
        dates.push(d.toISOString().split("T")[0]); // 'YYYY-MM-DD'
      }
      return dates;
    };

    // Define the type for status counts with an optional date property
    type StatusCounts = {
      [key: string]: number;
    };

    type StatusCount = {
      date: string;
      counts: StatusCounts;
    };

    // Function to generate the status count grouped by date
    const generateStatusCountByDate = (
      issues: { updatedAt: Date; status: string }[],
      minDate: Date,
      maxDate: Date
    ) => {
      const result: StatusCount[] = [];

      const dates = generateDateArray(minDate, maxDate);
      const statusMap: { [date: string]: StatusCounts } = {};

      dates.forEach(date => {
        statusMap[date] = {}; // Initialize with an empty object for statuses

        // Set all statuses to 0 initially for each date using the statuses array
        statuses.forEach(status => {
          statusMap[date][status] = 0;
        });
      });

      // Count the statuses for each date
      issues.forEach(({ updatedAt, status }) => {
        const dateKey = updatedAt.toISOString().split("T")[0];
        if (statusMap[dateKey]) {
          statusMap[dateKey][status] = (statusMap[dateKey][status] || 0) + 1;
        }
      });

      // Create the final result array from the map
      Object.entries(statusMap).forEach(([date, counts]) => {
        result.push({ date, counts });
      });

      return result;
    };

    // Generate the status count by date using the issues
    const issueStats = generateStatusCountByDate(issues, minDate, maxDate);

    return NextResponse.json(issueStats, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json('Something went wrong', { status: 500 });
  }
};
