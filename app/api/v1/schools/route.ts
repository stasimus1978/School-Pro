import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, slug } = await request.json();

  try {
    const existingSchool = await prisma.school.findUnique({
      where: { slug },
    });

    if (existingSchool) {
      return new Response(JSON.stringify({ error: "School with this already exists", data: null }), {
        status: 409,
        // headers: { "Content-Type": "application/json" },
      });
    }

    const newSchool = await prisma.school.create({
      data: { name, slug },
    });

    console.log(`School created successfully: ${newSchool.name} (${newSchool.id})`);

    return new Response(JSON.stringify({ data: newSchool, error: null }), {
      status: 201,
      // headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Something went wrong", data: null }), {
      status: 500,
      // headers: { "Content-Type": "application/json" },
    });
  }
}
