import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

//  Get
export async function GET(request: NextRequest) {
  try {
    const departments = await prisma.department.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
      },
    });

    return new Response(JSON.stringify({ data: departments, error: null }), {
      status: 200,
      // headers: { "Content-Type": "application/json" },
    });
  } catch (error) {}
}
