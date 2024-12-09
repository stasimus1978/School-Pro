"use server";

import api from "@/lib/api";
import { DepartmentCreateProps, DepartmentItem } from "@/types/types";
import axios from "axios";

export async function createDepartment(data: DepartmentCreateProps) {
  try {
    const response = await api.post("/classes", data);

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

export async function getAlldepartments() {
  try {
    const response = await api.get("/classes");
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
