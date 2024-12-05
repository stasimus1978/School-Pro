import { ContactProps } from "@/components/frontend/contact-us";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

// Create
export async function POST(request: NextRequest) {
  const data = (await request.json()) as ContactProps;

  const { email, school } = data;

  try {
    const exitingEmail = await prisma.contact.findUnique({
      where: { email },
    });

    const exitingSchool = await prisma.contact.findUnique({
      where: { school },
    });

    if (exitingEmail || exitingSchool) {
      return new Response(
        JSON.stringify({ error: "We have already received a request for this school or email", data: null }),
        {
          status: 409,
          // headers: { "Content-Type": "application/json" },
        }
      );
    }

    const newContact = await prisma.contact.create({
      data,
    });

    console.log(`Contact created successfully: ${newContact.school} (${newContact.id})`);

    return new Response(JSON.stringify({ data: newContact, error: null }), {
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
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify({ data: contacts, error: null }), {
      status: 200,
      // headers: { "Content-Type": "application/json" },
    });
  } catch (error) {}
}
