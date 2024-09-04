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
      description: body.description,
      developerId: body.developerId,
    }
  })

  return NextResponse.json(newIssue, { status: 201 });
}

export const GET = async () => {
  try {
    const issues = await prisma.issue.findMany({
      include: {
        developer: {
          select: {
            name: true,
          }
        }
      }
    });

    const resp = issues.map((issue) => ({
      id: issue.id,
      title: issue.title,
      description: issue.description,
      status: issue.status,
      createdAt: issue.createdAt,
      updatedAt:  issue.updatedAt,
      developerName: issue.developer?.name || null
    }))
    
    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json('Unable to fetch the issues', { status: 400 });
  }
}