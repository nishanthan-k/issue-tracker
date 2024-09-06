import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const issues = await prisma.issue.findMany({
      include: {
        developer: {
          select: {
            name: true,
          }
        }
      },
      orderBy: [
        {
          createdAt: 'asc',
        },
      ]
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