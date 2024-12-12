"use client";

import { cn } from "@/lib/utils";
import useSchoolStore from "@/store/school";
import { GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export default function Logo({ variant = "light", size = "md" }: LogoProps) {
  const { school } = useSchoolStore();

  if (variant === "light") {
    return (
      <Link href={"/"} className="flex items-center space-x-2">
        <div className="bg-blue-500 rounded-full p-1 md:hidden">
          <span className="text-white font-bold text-xl">
            <GraduationCap
              className={cn("size-6", size === "lg" && "size-10")}
            />
          </span>
        </div>
        <Image
          src={school?.logo ?? "/images/logo.png"}
          alt={school?.name ?? "School Pro"}
          className="w-44"
          width={500}
          height={150}
        />
      </Link>
    );
  } else {
    return (
      <Link href={"/"} className="flex items-center space-x-2 md:hidden">
        <div className="bg-white rounded-full p-1">
          <span className="text-blue-800 font-bold text-xl">
            <GraduationCap />
          </span>
        </div>
        <Image
          src={school?.logo ?? "/images/logo.png"}
          alt={school?.name ?? "School Pro"}
          className="w-44"
          width={500}
          height={150}
        />
      </Link>
    );
  }
}
