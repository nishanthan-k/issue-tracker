import { issueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

type IssueProps = z.infer<typeof issueSchema>
type IssueCountProps = {
  "OPEN"?: number,
  "IN_PROGRESS"?: number,
  "ON_REVIEW"?: number,
  "ON_REWORK"?: number,
  "CLOSED"?: number,
  "total"?: number,
}

export const GET = async () => {
  try {
    const issues = await prisma.issue.findMany();
    let total = 0;

    const issuesCount = issues.reduce((a: IssueCountProps, b) => {
        a[b.status] = (a[b.status] || 0) + 1;
        total += 1;
      return a;
    }, {})

    return  NextResponse.json({issuesStat: issuesCount, total}, { status: 200 });
  } catch (error) {
    console.log(error);
    return  NextResponse.json('Something went wrong', { status: 500 });
  }
}