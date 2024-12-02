"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckCircle, Info, X } from "lucide-react";
import { useState } from "react";

const bannerVariants = cva("flex items-center justify-between py-2 px-4 rounded-lg shadow-md mb-3 max-w-3xl", {
  variants: {
    type: {
      info: "bg-blue-100 text-blue-800 border border-blue-200",
      success: "bg-green-100 text-green-800 border border-green-200",
      warning: "bg-orange-100 text-orange-800 border border-orange-200",
      danger: "bg-red-100 text-red-800 border border-red-200",
    },
  },
  defaultVariants: {
    type: "info",
  },
});

interface BannerProps extends VariantProps<typeof bannerVariants> {
  message: string;
  type?: "info" | "success" | "warning" | "danger";
}

export default function InfoBanner({ message, type = "info" }: BannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={cn(bannerVariants({ type }))}>
      <div className="flex items-center space-x-3">
        {type === "info" ? <Info className="size-5 flex-shrink-0" /> : <CheckCircle className="size-5 flex-shrink-0" />}
        <p className="text-sm font-medium">{message}</p>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 focus:ring-blue-600 rounded-full p-1"
        aria-label="Dismiss"
      >
        <X className="size-5" />
      </button>
    </div>
  );
}
