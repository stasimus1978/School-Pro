import prisma from "@/lib/prisma";
import { generateSlug } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

// Create a new school
export async function POST(request: NextRequest) {
  const { name, logo } = await request.json();
  const slug = generateSlug(name);

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
      data: { name, slug, logo },
    });

    console.log(`School created successfully: ${newSchool.name} (${newSchool.id})`);

    const { createdAt, updatedAt, ...others } = newSchool;

    return new Response(JSON.stringify({ data: others, error: null }), {
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

// Get all schools
export async function GET(request: NextRequest) {
  try {
    const schools = await prisma.school.findMany({
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify({ data: schools, error: null }), {
      status: 200,
      // headers: { "Content-Type": "application/json" },
    });
  } catch (error) {}
}
