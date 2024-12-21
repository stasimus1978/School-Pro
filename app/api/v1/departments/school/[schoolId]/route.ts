import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

//  Get
export async function GET(request: NextRequest, { params }: { params: { schoolId: string } }) {
  // const body = await request.json();
  const { schoolId } = params;

  // console.log("School ID: ", schoolId);

  try {
    const departments = await prisma.department.findMany({
      orderBy: { createdAt: "desc" },
      where: { schoolId },
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