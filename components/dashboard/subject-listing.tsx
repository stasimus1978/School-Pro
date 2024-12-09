"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import SubjectForm from "./forms/academics/subject-form.tsx";
import { BriefDepartmentItem, SelectOptionProps, SubjectItem } from "@/types/types";
import { Sheet } from "../ui/sheet";

const subjects: SubjectItem[] = [{}, {}];

type SubjectListingProps = {
  departments: SelectOptionProps[];
};

export default function SubjectListing({ departments }: SubjectListingProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<SelectOptionProps>(departments[0]);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-80 flex-col border-r">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Subjects</h2>
          <SubjectForm departments={departments} />
        </div>

        <ScrollArea className="flex-1">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className={`p-4 flex items-center justify-between hover:bg-muted/50 cursor-pointer ${
                selectedSubject.id === subject.id ? "bg-muted/50" : ""
              }`}
              onClick={() => setSelectedSubject(subject)}
            >
              <span className="font-medium">{subject.name}</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Pencil className="size-4" />
                </Button>

                <Button variant="ghost" size="icon">
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}></Sheet>
    </div>
  );
}
