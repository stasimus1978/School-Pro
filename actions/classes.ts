"use server";

import api from "@/lib/api";
import { ClassCreateProps, ClassItem } from "@/types/types";
import { Contact, Prisma } from "@prisma/client";
import axios from "axios";

export async function createClass(data: ClassCreateProps) {
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

export async function deleteClass(id: string) {
  console.log("deleted", id);

  return {
    ok: true,
  };
}

export async function getAllClasses() {
  try {
    const response = await api.get("/classes");
    const classes = response.data.data;

    return classes as ClassItem[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create contact!";
      throw new Error(message);
    }

    throw error;
  }
}
