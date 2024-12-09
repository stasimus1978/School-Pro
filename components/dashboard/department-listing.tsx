"use client";

import DepartmentForm from "./forms/academics/department-form";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { BookOpen, Calendar, DollarSign, Pencil, School, Scroll, Trash2, User, Users } from "lucide-react";
import { DepartmentItem } from "@/types/types";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { format, sub } from "date-fns";

export default function DepartmentListing({ departments }: { departments: DepartmentItem[] }) {
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
              <div
                key={dept.id}
                className={`p-4 flex items-center justify-between hover:bg-muted/50 cursor-pointer ${
                  selectedDept.id === dept.id ? "bg-muted" : ""
                }`}
                onClick={() => {
                  setSelectedDept(dept);
                  setIsMobileOpen(false);
                }}
              >
                <span className="font-medium">{dept.name}</span>
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
        <Sheet open={isMobileOpen} onOpenChange={() => setIsMobileOpen(false)}>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Departments</SheetTitle>
            </SheetHeader>

            <ScrollArea className="flex-1 mt-4">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  className={`p-4 flex items-center justify-between hover:bg-muted/50 cursor-pointer ${
                    selectedDept.id === dept.id ? "bg-muted" : ""
                  }`}
                  onClick={() => {
                    setSelectedDept(dept);
                    setIsMobileOpen(false);
                  }}
                >
                  <span className="font-medium">{dept.name} Department</span>
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
          </SheetContent>
        </Sheet>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileOpen(true)}>
              <Users className="size-4" />
            </Button>

            <h1 className="text-2xl font-bold">{selectedDept.name} Department</h1>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Teachers</CardTitle>
                <Users className="size-4 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">{selectedDept.teachers.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold">Subjects</CardTitle>
                <BookOpen className="size-4 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">{selectedDept.subjects.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Annual Budget</CardTitle>
                <DollarSign className="size-4 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">
                  {/* ${selectedDept.budget?.toLocaleString()} */} ${(75000)?.toLocaleString()}
                </div>

                <p className="text-xs text-muted-foreground">
                  FY 2023-2024
                  {/* {selectedDept.budgetYear} */}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Department Details</CardTitle>
              </CardHeader>

              <CardHeader className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Created: </span>
                  <span className="text-sm">{format(selectedDept.createdAt, "PPP")}</span>
                </div>

                <div className="flex items-center gap-2">
                  <User className="size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">HOD: </span>
                  <span className="text-sm font-medium">
                    Dr. Marie Curie
                    {/* {selectedDept.hodName} */}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">HOD Since:</span>
                  <span className="text-sm">
                    {/* {selectedDept.hodStartDate ? format(selectedDept.hodStartDate, "PPP") : "Not Assigned"} */}
                    {!selectedDept.hodStartDate ? format(new Date("2023-02-01"), "PPP") : "Not Assigned"}
                  </span>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Teachers</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: "3", name: "Robert Wilson", subject: "Physis" },
                    { id: "4", name: "Mary Johnson", subject: "Chemistry" },
                  ].map((teacher) => (
                    <div key={teacher.id} className="flex items-center justify-between">
                      <div className="">
                        <p className="font-medium">{teacher.name}</p>
                        <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Subjects</CardTitle>
              </CardHeader>

              <CardContent className="grid gap-4 md:grid-cols-2">
                {[
                  { id: "4", name: "Physis", code: "SCI101" },
                  { id: "5", name: "Chemistry", code: "SCI102" },
                  { id: "6", name: "Biology", code: "SCI103" },
                ].map((subject) => (
                  <div key={subject.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="">
                      <p className="font-medium">{subject.name}</p>
                      <p className="text-sm text-muted-foreground">{subject.code}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
