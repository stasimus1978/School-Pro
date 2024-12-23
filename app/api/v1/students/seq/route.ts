import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

//  Get
export async function GET(request: NextRequest, { params }: { params: { schoolId: string } }) {
  // const body = await request.json();
  const { schoolId } = params;
  try {
    const lastStudent = await prisma.student.findFirst({
      orderBy: { createdAt: "desc" },
      where: { schoolId },
    });

    //   BU/BD/2024/0001
    const stringSeq = lastStudent?.regNo.split("/")[3];
    const lastSeq = stringSeq ? parseInt(stringSeq) : 0;
    const nextSeq = lastSeq + 1;

    return new Response(JSON.stringify({ data: nextSeq, error: null }), {
      status: 200,
      // headers: { "Content-Type": "application/json" },
    });
  } catch (error) {}
}
