import { generateSlug } from "@/lib/generateSlug";
import prisma from "@/lib/prisma";
import { StreamCreateProps } from "@/types/types";
import { NextRequest } from "next/server";

// Create Class
export async function POST(request: NextRequest) {
  const data = (await request.json()) as StreamCreateProps;

  const slug = generateSlug(data.title);

  console.log(data);

  try {
    const exitingStream = await prisma.stream.findUnique({
      where: { slug },
    });

    if (exitingStream) {
      return new Response(JSON.stringify({ error: "Stream Already exists", data: null }), {
        status: 409,
        // headers: { "Content-Type": "application/json" },
      });
    }

    const newStream = await prisma.stream.create({
      data: {
        title: data.title,
        slug: slug,
        classId: data.classId,
        schoolId: data.schoolId,
      },
    });

    console.log(`Stream created successfully: ${newStream.title} (${newStream.id})`);

    return new Response(JSON.stringify({ data: newStream, error: null }), {
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
    const streams = await prisma.stream.findMany({
      orderBy: { createdAt: "desc" },
      //   include: { class: true },
    });

    return new Response(JSON.stringify({ data: streams, error: null }), {
      status: 200,
      // headers: { "Content-Type": "application/json" },
    });
  } catch (error) {}
}
