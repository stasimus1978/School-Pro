"use server";

import api from "@/lib/api";
import { UserCreateProps, UserLoginProps } from "@/types/types";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function createUser(data: UserCreateProps) {
  try {
    const response = await api.post("/users/register", data);

    // revalidatePath("/dashboard/users");

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to create User!";
      throw new Error(message);
    }

    throw error;
  }
}

export async function loginUser(data: UserLoginProps) {
  try {
    const response = await api.post("/users/login", data);

    // revalidatePath("/dashboard/users");

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to login User!";
      throw new Error(message);
    }

    throw error;
  }
}

// export async function deleteParent(id: string) {
//   console.log("deleted", id);

//   return {
//     ok: true,
//   };
// }

// export async function getAllParents() {
//   try {
//     const response = await api.get("/parents");
//     const parents = response.data.data;

//     return parents as ParentItem[];
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       const message = error.response?.data?.message || "Failed to create contact!";
//       throw new Error(message);
//     }

//     throw error;
//   }
// }
