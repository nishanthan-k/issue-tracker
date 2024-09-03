import { createIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title, 
      description: body.description
    }
  })

  return NextResponse.json(newIssue, { status: 201 });
}

export const GET = async () => {
  try {
    const issues = await prisma.issue.findMany({ where: {} });
    
    return NextResponse.json(issues, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json('Unable to fetch the issues', { status: 400 });
  }
}