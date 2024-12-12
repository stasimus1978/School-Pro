import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const school = await prisma.school.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        logo: true,
        slug: true,
      },
    });

    return new Response(JSON.stringify({ data: school, error: null }), {
      status: 200,
      // headers: { "Content-Type": "application/json" },
    });
  } catch (error) {}
}
