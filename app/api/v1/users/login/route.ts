// import { convertDateToISO } from "@/lib/convertDateToIso";
import prisma from "@/lib/prisma";
import { generateAccessToken, generateRefreshToken, TokenPayload } from "@/lib/tokens";
import { TypedRequestBody, UserCreateProps, UserLoginProps } from "@/types/types";
import bcrypt from "bcryptjs";

// Create
export async function POST(request: TypedRequestBody<UserLoginProps>) {
  const data = await request.json();

  const { email, password } = data;

  try {
    const exitingUser = await prisma.user.findUnique({
      where: { email },
      select: {
        createdAt: true,
        email: true,
        id: true,
        image: true,
        name: true,
        phone: true,
        role: true,
        schoolId: true,
        schoolName: true,
        updatedAt: true,
        password: true,
      },
    });

    if (!exitingUser) {
      return new Response(JSON.stringify({ error: "Invalid credentials!", data: null }), {
        status: 409,
        // headers: { "Content-Type": "application/json" },
      });
    }

    // Verify the password
    const isValidPassword = await bcrypt.compare(password, exitingUser.password);

    if (!isValidPassword) {
      return new Response(JSON.stringify({ error: "Invalid credentials!", data: null }), {
        status: 401,
        // headers: { "Content-Type": "application/json" },
      });
    }

    // Generate tokens
    const tokenPayload: TokenPayload = {
      userId: exitingUser.id,
      email: exitingUser.email,
      role: exitingUser.role,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: exitingUser.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    // Remove sensitive data
    const { password: _, ...userWithoutPassword } = exitingUser;

    const response = {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };

    return new Response(JSON.stringify({ data: response, error: null }), {
      status: 200,
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
