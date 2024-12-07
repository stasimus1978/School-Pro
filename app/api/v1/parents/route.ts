// import { convertDateToISO } from "@/lib/convertDateToIso";
import prisma from "@/lib/prisma";
import { ParentCreateProps, TypedRequestBody } from "@/types/types";
import { NextRequest } from "next/server";

function convertDateToISO(dateStr: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    throw new Error("Invalid date format. Please use YYYY-MM-DD");
  }

  const prismaDateTime = `${dateStr}T00:00:00.000Z`;

  return prismaDateTime;
}

// Create
export async function POST(request: TypedRequestBody<ParentCreateProps>) {
  const data = await request.json();

  const { NIN, phone, email, dob } = data;

  data.dob = new Date(convertDateToISO(dob?.toString()));

  try {
    const exitingEmail = await prisma.parent.findUnique({
      where: { email },
    });

    const exitingNIN = await prisma.parent.findUnique({
      where: { NIN },
    });

    const exitingPhone = await prisma.parent.findUnique({
      where: { phone },
    });

    if (exitingNIN) {
      return new Response(JSON.stringify({ error: "Parent with NIN already exists", data: null }), {
        status: 409,
        // headers: { "Content-Type": "application/json" },
      });
    }

    if (exitingEmail) {
      return new Response(JSON.stringify({ error: "Parent with Email already exists", data: null }), {
        status: 409,
        // headers: { "Content-Type": "application/json" },
      });
    }

    if (exitingPhone) {
      return new Response(JSON.stringify({ error: "Parent with Phone already exists", data: null }), {
        status: 409,
        // headers: { "Content-Type": "application/json" },
      });
    }

    const newParent = await prisma.parent.create({
      data,
    });

    console.log(`Parent created successfully: ${newParent.firstName} (${newParent.id})`);

    return new Response(JSON.stringify({ data: newParent, error: null }), {
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
    const parents = await prisma.parent.findMany({
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify({ data: parents, error: null }), {
      status: 200,
      // headers: { "Content-Type": "application/json" },
    });
  } catch (error) {}
}
