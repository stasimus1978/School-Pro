import { cn } from "@/lib/utils";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export default function Logo({ variant = "light", size = "md" }: LogoProps) {
  if (variant === "light") {
    return (
      <Link href={"/"} className="flex items-center space-x-2">
        <div className="bg-blue-500 rounded-full p-1">
          <span className="text-white font-bold text-xl">
            <GraduationCap className={cn("size-6", size === "lg" && "size-10")} />
          </span>
        </div>
        <span className={cn("font-bold text-xl", size === "lg" && "text-4xl")}>
          School<span className="text-blue-500">Pro</span>
        </span>
      </Link>
    );
  } else {
    return (
      <Link href={"/"} className="flex items-center space-x-2">
        <div className="bg-white rounded-full p-1">
          <span className="text-blue-800 font-bold text-xl">
            <GraduationCap />
          </span>
        </div>
        <span className="font-bold text-xl">
          School<span className="text-blue-100">Pro</span>
        </span>
      </Link>
    );
  }
}
