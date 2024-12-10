// import { convertDateToISO } from "@/lib/convertDateToIso";
import prisma from "@/lib/prisma";
import { TypedRequestBody, UserCreateProps } from "@/types/types";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

// Create
export async function POST(request: TypedRequestBody<UserCreateProps>) {
  const data = await request.json();

  const { email, password, role, name, phone, image, schoolId, schoolName } = data;

  console.log(data);

  try {
    const exitingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (exitingEmail) {
      return new Response(JSON.stringify({ error: "Email already exists", data: null }), {
        status: 409,
        // headers: { "Content-Type": "application/json" },
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    data.password = hashedPassword;

    const newUser = await prisma.user.create({
      data,
    });

    console.log(`User created successfully: ${newUser.name} (${newUser.id})`);

    return new Response(JSON.stringify({ data: newUser, error: null }), {
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
