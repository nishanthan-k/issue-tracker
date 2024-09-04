import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const resp = await prisma.developer.findMany();

    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: 'Something went wrong'}, { status: 400 });
  }
}