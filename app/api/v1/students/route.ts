import { convertDateToISO } from "@/lib/convertDateToISO";
import prisma from "@/lib/prisma";
import { StudentCreateProps, TypedRequestBody } from "@/types/types";
import { NextRequest } from "next/server";

// Create
export async function POST(request: TypedRequestBody<StudentCreateProps>) {
  const data = await request.json();

  const { BCN, regNo, email, rollNo, dob } = data;

  data.dob = new Date(convertDateToISO(dob?.toString()));

  try {
    const exitingEmail = await prisma.student.findUnique({
      where: { email },
    });

    const exitingBCN = await prisma.student.findUnique({
      where: { BCN },
    });

    const exitingRegNo = await prisma.student.findUnique({
      where: { regNo },
    });

    const exitingRollNo = await prisma.student.findUnique({
      where: { rollNo },
    });

    if (exitingBCN) {
      return new Response(JSON.stringify({ error: "Student with BCN already exists", data: null }), {
        status: 409,
        // headers: { "Content-Type": "application/json" },
      });
    }

    if (exitingEmail) {
      return new Response(JSON.stringify({ error: "Student with Email already exists", data: null }), {
        status: 409,
        // headers: { "Content-Type": "application/json" },
      });
    }

    if (exitingRegNo) {
      return new Response(JSON.stringify({ error: "Student with RegNo already exists", data: null }), {
        status: 409,
        // headers: { "Content-Type": "application/json" },
      });
    }

    if (exitingRollNo) {
      return new Response(JSON.stringify({ error: "Student with RollNo already exists", data: null }), {
        status: 409,
        // headers: { "Content-Type": "application/json" },
      });
    }

    const newStudent = await prisma.student.create({
      data,
    });

    console.log(`Student created successfully: ${newStudent.firstName} (${newStudent.id})`);

    return new Response(JSON.stringify({ data: newStudent, error: null }), {
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
    const students = await prisma.student.findMany({
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify({ data: students, error: null }), {
      status: 200,
      // headers: { "Content-Type": "application/json" },
    });
  } catch (error) {}
}
