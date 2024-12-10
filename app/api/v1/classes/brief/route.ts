import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const classes = await prisma.class.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true },
    });

    return new Response(JSON.stringify({ data: classes, error: null }), {
      status: 200,
      // headers: { "Content-Type": "application/json" },
    });
  } catch (error) {}
}
