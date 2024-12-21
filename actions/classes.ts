"use server";

import api from "@/lib/api";
import { ClassCreateProps, ClassWithCountAndStreams } from "@/types/types";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function createClass(data: ClassCreateProps) {
  try {
    const response = await api.post("/classes", data);

    revalidatePath("/dashboard/academics/classes");

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create Class!";
      throw new Error(message);
    }

    throw error;
  }
}

export async function deleteClass(id: string) {
  console.log("deleted", id);

  return {
    ok: true,
  };
}

export async function getAllClasses(schoolId: string) {
  try {
    const response = await api.get(`/classes/school/${schoolId}`);
    const classes = response.data.data;

    return classes as ClassWithCountAndStreams[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create contact!";
      throw new Error(message);
    }

    throw error;
  }
}

export async function getBriefClasses() {
  try {
    const response = await api.get("/classes/brief");
    const classes = response.data.data;

    return classes as { id: string; title: string }[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create contact!";
      throw new Error(message);
    }

    throw error;
  }
}
