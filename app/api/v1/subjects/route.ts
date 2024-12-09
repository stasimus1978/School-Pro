import prisma from "@/lib/prisma";
import { generateSlug } from "@/lib/generateSlug";
import { SubjectCreateProps } from "@/types/types";
import { NextRequest } from "next/server";

// Create Class
export async function POST(request: NextRequest) {
  const data = (await request.json()) as SubjectCreateProps;

  const slug = generateSlug(data.name);
  data.slug = slug;

  try {
    const exitingSubject = await prisma.subject.findUnique({
      where: { slug },
    });

    if (exitingSubject) {
      return new Response(JSON.stringify({ error: "Subject Already exists", data: null }), {
        status: 409,
        // headers: { "Content-Type": "application/json" },
      });
    }

    const newSubject = await prisma.subject.create({ data });

    console.log(`Subject created successfully: ${newSubject.name} (${newSubject.id})`);

    return new Response(JSON.stringify({ data: newSubject, error: null }), {
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

//  Get
export async function GET(request: NextRequest) {
  try {
    const subjects = await prisma.subject.findMany({
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify({ data: subjects, error: null }), {
      status: 200,
      // headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify({ error: "Failed to fetch Subjects", data: null }), {
      status: 500,
      // headers: { "Content-Type": "application/json" },
    });
  }
}
