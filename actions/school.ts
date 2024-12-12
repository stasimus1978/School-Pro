"use server";

import { SchoolProps } from "@/components/dashboard/forms/school/school-admin-form";
import api from "@/lib/api";
import { SchoolResponse } from "@/types/types";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function createSchool(data: SchoolProps) {
  try {
    const response = await api.post("/schools", data);

    revalidatePath("/dashboard/admin/schools");

    // console.log("Response: ", response.data as SchoolResponse);

    return response.data.data as SchoolResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Failed to create school!";
      throw new Error(message);
    }

    throw error;
  }
}

export async function getSchoolById(id: string | null | undefined) {
  if (id) {
    try {
      const response = await api.get(`/schools/${id}`);

      const school = response.data.data;

      return school as SchoolResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Failed to fetch School!";
        throw new Error(message);
      }

      throw error;
    }
  } else {
    const school = {
      id: null,
      name: null,
      logo: null,
      slug: null,
    };
    return school;
  }
}
