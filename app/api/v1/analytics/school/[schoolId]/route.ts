import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

//  Get
export async function GET(request: NextRequest, { params }: { params: { schoolId: string } }) {
  const { schoolId } = params;

  try {
    const students = await prisma.user.count({
      where: { schoolId, role: "STUDENT" },
    });

    const teachers = await prisma.user.count({
      where: { schoolId, role: "TEACHER" },
    });

    const parents = await prisma.user.count({
      where: { schoolId, role: "PARENT" },
    });

    const classes = await prisma.class.count({
      where: { schoolId },
    });

    const result = [
      { title: "Students", count: students },
      { title: "Teachers", count: teachers },
      { title: "Parents", count: parents },
      { title: "Classes", count: classes },
    ];

    return new Response(JSON.stringify({ data: result, error: null }), {
      status: 200,
      // headers: { "Content-Type": "application/json" },
    });
  } catch (error) {}
}
