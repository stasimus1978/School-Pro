"use server";

import axios from "axios";
import { SchoolProps } from "@/components/dashboard/forms/school/school-onboarding";
import { revalidatePath } from "next/cache";
import api from "@/lib/api";
import { SchoolResponse } from "@/types/types";

export async function createSchool(data: SchoolProps) {
  try {
    const response = await api.post("/schools", data);

    revalidatePath("/dashboard/admin/schools");

    return response.data as SchoolResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create school!";
      throw new Error(message);
    }

    throw error;
  }
}
