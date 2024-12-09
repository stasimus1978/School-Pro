"use server";

import api from "@/lib/api";
import { BriefDepartmentItem, DepartmentCreateProps, DepartmentItem } from "@/types/types";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function createDepartment(data: DepartmentCreateProps) {
  try {
    const response = await api.post("/departments", data);

    revalidatePath("/dashboard/academics/departments");

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create Class!";
      throw new Error(message);
    }

    throw error;
  }
}

export async function deleteDepartment(id: string) {
  console.log("deleted", id);

  return {
    ok: true,
  };
}

export async function getAllDepartments() {
  try {
    const response = await api.get("/departments");

    const departments = response.data.data;

    return departments as DepartmentItem[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create contact!";
      throw new Error(message);
    }

    throw error;
  }
}

//
export async function getBriefDepartments() {
  try {
    const response = await api.get("/departments/brief");

    const briefDepartments = response.data.data;

    return briefDepartments as [BriefDepartmentItem];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create contact!";
      throw new Error(message);
    }

    throw error;
  }
}
