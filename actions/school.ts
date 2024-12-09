"use server";

import axios from "axios";
import { SchoolProps } from "@/components/dashboard/forms/school/school-onboarding";
import { revalidatePath } from "next/cache";

const BASE_API_URL = process.env.API_URL || "";

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function createSchool(data: SchoolProps) {
  const endpoint = `${BASE_API_URL}/schools`;

  try {
    const response = await api.post("/schools", data);

    revalidatePath("/dashboard/admin/schools");

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create school!";
      throw new Error(message);
    }

    throw error;
  }
}
