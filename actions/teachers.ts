"use server";

import api from "@/lib/api";
import { TeacherCreateProps, TeacherItem } from "@/types/types";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function createTeacher(data: TeacherCreateProps) {
  try {
    console.log(data);

    const response = await api.post("/teachers", data);

    revalidatePath("/dashboard/users/teachers");

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create Teacher!";
      throw new Error(message);
    }

    throw error;
  }
}

export async function deleteTeacher(id: string) {
  console.log("deleted", id);

  return {
    ok: true,
  };
}

export async function getAllTeachers() {
  try {
    const response = await api.get("/teachers");
    const teachers = response.data.data;

    return teachers as TeacherItem[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create contact!";
      throw new Error(message);
    }

    throw error;
  }
}
