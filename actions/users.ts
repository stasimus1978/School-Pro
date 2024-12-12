"use server";

import api from "@/lib/api";
import { UserCreateProps } from "@/types/types";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function createUser(data: UserCreateProps) {
  try {
    console.log(data);

    const response = await api.post("/users/register", data);

    // revalidatePath("/dashboard/users/teachers");

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create Teacher!";
      throw new Error(message);
    }

    throw error;
  }
}
