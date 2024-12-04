import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//
export function generateSlug(title: string): string {
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  const cleanedSlug = slug.replace(/[^\w\-]/g, "");

  return cleanedSlug;
}
