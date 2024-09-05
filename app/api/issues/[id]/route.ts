import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface ParamsProps {
  params: {
    id: string
  }
}

export const GET = async (req: NextRequest, { params }: ParamsProps) => {
  try {
    const issue = await prisma.issue.findUnique({
      where: {
        id: parseInt(params.id)
      },
    });
    
    return NextResponse.json(issue, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json('Unable to fetch the issues', { status: 400 });
  }
}

export const POST = async  (req: NextRequest) => {
  const  body = await req.json();

  const data = Object.fromEntries(
    Object.entries(body).filter(([key, value]) => value !== '' && value !== null && value !== '0')
  )

  try {
    const issue = await prisma.issue.update({
      where: {
        id: body.id
      },
      data,
    })

    return new NextResponse('Issue updated', { status: 202 })
  } catch (error) {
    console.log(error);
    return new NextResponse('Issue updated', { status: 202 })
    
  }
}