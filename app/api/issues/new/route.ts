import { createIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  console.log(body);
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    const newIssue = await prisma.issue.create({
      data: {
        title: body.title, 
        description: body.description,
        developerId: body.developerId,
      }
    })
    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json('Error in creating issue', { status: 400 });
  }

}