import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

//  Get
export async function GET(request: NextRequest, { params }: { params: { schoolId: string } }) {
  // const body = await request.json();
  const { schoolId } = params;

  // console.log("School ID: ", schoolId);

  try {
    const classes = await prisma.parent.findMany({
      orderBy: { createdAt: "desc" },
      where: { schoolId },
    });

    return new Response(JSON.stringify({ data: classes, error: null }), {
      status: 200,
      // headers: { "Content-Type": "application/json" },
    });
  } catch (error) {}
}
