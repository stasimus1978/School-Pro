import { generateSlug } from "@/lib/generateSlug";
import prisma from "@/lib/prisma";
import { DepartmentCreateProps } from "@/types/types";
import { NextRequest } from "next/server";

// Create Class
export async function POST(request: NextRequest) {
  const data = (await request.json()) as DepartmentCreateProps;

  const slug = generateSlug(data.name);

  try {
    const exitingDepartment = await prisma.department.findUnique({
      where: { slug },
    });

    if (exitingDepartment) {
      return new Response(JSON.stringify({ error: "Department Already exists", data: null }), {
        status: 409,
        // headers: { "Content-Type": "application/json" },
      });
    }

    const newDepartment = await prisma.department.create({
      data: {
        name: data.name,
        slug: slug,
      },
    });

    console.log(`Department created successfully: ${newDepartment.name} (${newDepartment.id})`);

    return new Response(JSON.stringify({ data: newDepartment, error: null }), {
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
    const departments = await prisma.department.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        teachers: true,
        subjects: true,
      },
    });

    return new Response(JSON.stringify({ data: departments, error: null }), {
      status: 200,
      // headers: { "Content-Type": "application/json" },
    });
  } catch (error) {}
}
