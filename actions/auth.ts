"use server";

// TODO: Rename file to auth.ts
import api from "@/lib/api";
import { SessionData } from "@/store/auth";
import { SchoolItem, UserItem, type UserCreateProps, type UserLoginProps } from "@/types/types";
import axios from "axios";
import { cookies } from "next/headers";
import { getSchoolById } from "./school";

export async function createUser(data: UserCreateProps) {
  try {
    const response = await api.post("/users/register", data);

    // revalidatePath("/dashboard/users");

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create User!";
      throw new Error(message);
    }

    throw error;
  }
}

export async function loginUser(data: UserLoginProps): Promise<SessionData> {
  try {
    // const { email, password } = data;

    const response = await api.post("/users/login", data);

    const { user, accessToken, refreshToken } = response.data.data;

    const userData = response.data.data;

    await createServerSession(userData);

    const school = await getSchoolById(userData?.user.schoolId);

    await saveServerSchool(school as SchoolItem);

    console.log("Answer: ", user, accessToken, refreshToken);

    // revalidatePath("/dashboard/users");

    return response.data.data as SessionData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to login User!";
      console.log(error.response?.data);

      throw new Error(message);
    }

    throw error;
  }
}

export async function createServerSession(data: SessionData) {
  try {
    const cookieStore = await cookies();

    cookieStore.set("user", JSON.stringify(data.user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60, // 60 minutes
    });

    cookieStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60, // 60 minutes
    });

    cookieStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60, // 60 minutes
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to create user session", error);
    return { success: false, error: "Invalid session data" };
  }
}

export async function saveServerSchool(data: SchoolItem) {
  try {
    const cookieStore = await cookies();

    cookieStore.set("school", JSON.stringify(data), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to create School session", error);
    return { success: false, error: "Invalid session data" };
  }
}

export async function logout() {
  try {
    const cookieStore = await cookies();

    cookieStore.delete("user");
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return { success: true };
  } catch (error) {
    console.error("Logout error", error);
    return { success: false, error: "Failed to logout" };
  }
}

export async function getServerUser() {
  const cookieStore = await cookies();

  const userCookie = cookieStore.get("user");

  if (!userCookie) return null;

  try {
    const user = JSON.parse(userCookie.value);
    return user as UserItem;
  } catch (error) {
    return null;
  }
}

export async function getServerSchool() {
  const cookieStore = await cookies();

  const schoolCookie = cookieStore.get("school");

  if (!schoolCookie) return null;

  try {
    const school = JSON.parse(schoolCookie.value);
    return school as SchoolItem;
  } catch (error) {
    return null;
  }
}
