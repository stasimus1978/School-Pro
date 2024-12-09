"use client";

import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { School } from "lucide-react";
import DepartmentForm from "./forms/academics/department-form";

const departments = [
  {
    id: "1",
    mane: "Mathematics Department",
    slug: "mathematics-department",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-12-20"),
    hodId: "hod1",
    hodName: "Dr. Alan Turing",
    hodStartDate: new Date("2023-01-15"),
    budget: 50000,
    budgetYear: "2023-2024",
  },
];

export default function DepartmentListing() {
  const [selectedDept, setSelectedDept] = useState(departments[0]);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-80 flex-col border-r">
        <div className="border-b pb-1">
          <div className="flex items-center justify-between gap-2 px-4 py-2">
            <div className="flex items-center gap-2">
              <School className="size-6" />
              <h2 className="text-xl font-semibold">Departments</h2>
            </div>
            <DepartmentForm />
          </div>

          <ScrollArea className="flex-1">
            {departments.map((dept) => (
              <div key={dept.id} className=""></div>
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
