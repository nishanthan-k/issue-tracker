import { DeveloperIssuesSummary } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

interface Developer {
  id: number;
  name: string;
}

type Status = 'OPEN' | 'IN_PROGRESS' | 'ON_REVIEW' | 'ON_REWORK' | 'CLOSED';

interface Issue {
  id: number;
  title: string;
  description: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  developerId: number | null;
  developer: Developer | null;
}

export const GET = async () => {
  try {
    const issues = await prisma.issue.findMany({
      include: {
        developer: {
          select: {
            name: true,
            id: true,
          }
        }
      },
    });

    const groupedByDeveloper: DeveloperIssuesSummary[] = issues.reduce<DeveloperIssuesSummary[]>((acc, issue) => {
      if (issue.developer) {
        const { id, name } = issue.developer;
    
        let developerSummary = acc.find(dev => dev.id === id);
    
        if (!developerSummary) {
          developerSummary = {
            id,
            name,
            OPEN: 0,
            IN_PROGRESS: 0,
            ON_REVIEW: 0,
            ON_REWORK: 0,
            CLOSED: 0,
            total: 0,
          };
          acc.push(developerSummary);
        }
    
        developerSummary[issue.status] += 1;
        developerSummary.total += 1;
      }
    
      return acc;
    }, []);

    return NextResponse.json(groupedByDeveloper, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json('Something went wrong', { status: 500 });
  }
};
