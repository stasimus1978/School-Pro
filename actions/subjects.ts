"use server";

import api from "@/lib/api";
import { BriefSubjectItem, SubjectCreateProps, SubjectItem } from "@/types/types";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function createSubjects(data: SubjectCreateProps) {
  try {
    const response = await api.post("/subjects", data);

    revalidatePath("/dashboard/academics/subjects");

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create Subjects!";
      throw new Error(message);
    }

    throw error;
  }
}

export async function deleteSubjects(id: string) {
  console.log("deleted", id);

  return {
    ok: true,
  };
}

export async function getAllSubjects(schoolId: string) {
  try {
    const response = await api.get(`/subjects/school/${schoolId}`);

    const subjects = response.data.data;

    return subjects as SubjectItem[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to fetch Subjects!";
      throw new Error(message);
    }

    throw error;
  }
}

export async function getBriefSubjects(schoolId: string) {
  try {
    const response = await api.get(`/subjects/brief/${schoolId}`);

    const briefSubjects = response.data.data;

    return briefSubjects as [BriefSubjectItem];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create contact!";
      throw new Error(message);
    }

    throw error;
  }
}
