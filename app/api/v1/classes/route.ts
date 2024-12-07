import { generateSlug } from "@/lib/generateSlug";
import prisma from "@/lib/prisma";
import { ClassCreateProps } from "@/types/types";
import { NextRequest } from "next/server";

// Create Class
export async function POST(request: NextRequest) {
  const data = (await request.json()) as ClassCreateProps;

  const slug = generateSlug(data.title);

  try {
    const exitingClass = await prisma.class.findUnique({
      where: { slug },
    });

    if (exitingClass) {
      return new Response(JSON.stringify({ error: "Class Already exists", data: null }), {
        status: 409,
        // headers: { "Content-Type": "application/json" },
      });
    }

    const newClass = await prisma.class.create({
      data: {
        title: data.title,
        slug: slug,
      },
    });

    console.log(`Class created successfully: ${newClass.title} (${newClass.id})`);

    return new Response(JSON.stringify({ data: newClass, error: null }), {
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
    const classes = await prisma.class.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        streams: {
          include: {
            _count: {
              select: { students: true },
            },
          },
        },
        _count: {
          select: { students: true },
        },
      },
    });

    return new Response(JSON.stringify({ data: classes, error: null }), {
      status: 200,
      // headers: { "Content-Type": "application/json" },
    });
  } catch (error) {}
}
