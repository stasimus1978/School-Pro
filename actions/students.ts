"use server";

import api from "@/lib/api";
import { StudentCreateProps, StudentItem } from "@/types/types";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function createStudent(data: StudentCreateProps) {
  try {
    const response = await api.post("/students", data);

    revalidatePath("/dashboard/students");

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create Student!";
      throw new Error(message);
    }

    throw error;
  }
}

export async function deleteStudent(id: string) {
  console.log("deleted", id);

  return {
    ok: true,
  };
}

export async function getAllStudents() {
  try {
    const response = await api.get("/students");
    const students = response.data.data;

    return students as StudentItem[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create contact!";
      throw new Error(message);
    }

    throw error;
  }
}

export async function getStudentNextSequence() {
  try {
    const response = await api.get("/students/seq");
    const nextSeq = response.data.data;

    return nextSeq as number;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create contact!";
      throw new Error(message);
    }

    throw error;
  }
}
