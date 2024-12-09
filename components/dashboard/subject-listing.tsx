"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Beaker, Book, CheckCircle, Pencil, Plus, Trash2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import SubjectForm from "./forms/academics/subject-form.tsx";
import { SelectOptionProps, SubjectItem } from "@/types/types";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { format } from "date-fns";
import { Badge } from "../ui/badge";

type SubjectListingProps = {
  subjects: SubjectItem[];
  departments: SelectOptionProps[];
};

export default function SubjectListing({ departments, subjects }: SubjectListingProps) {
  //   const [selectedDepartment, setSelectedDepartment] = useState<SelectOptionProps>(departments[0]);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-80 flex-col border-r">
        <div className="pb-1 border-b flex justify-between items-center px-3 py-2">
          <div className="flex items-center gap-2">
            <Book className="size-6" />
            <h2 className="text-xl font-semibold">Subjects</h2>
          </div>
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
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="w-80">
          <SheetHeader className="flex justify-between items-center">
            <SheetTitle>Subjects</SheetTitle>
            <Button variant="ghost" size="icon" title="Add Subject">
              <Plus className="size-4" />
            </Button>
          </SheetHeader>

          <ScrollArea className="flex-1 mt-4">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className={`p-4 flex items-center justify-between hover:bg-muted/50 cursor-pointer ${
                  selectedSubject.id === subject.id ? "bg-muted" : ""
                }`}
                onClick={() => {
                  setSelectedSubject(subject);
                  setIsMobileOpen(false);
                }}
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
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileOpen(true)}>
              <Book className="size-4" />
            </Button>

            <h1 className="text-2xl font-bold">{selectedSubject.name}</h1>
          </div>
        </div> */}

        <ScrollArea className="flex-1 p-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
                <CardTitle className="text-sm font-medium">Subject Code</CardTitle>
                <Book className="size-4 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">{selectedSubject.code}</div>

                <p className="text-xs text-muted-foreground">{selectedSubject.shortName}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
                <CardTitle className="text-sm font-medium">Category</CardTitle>
                <Beaker className="size-4 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">{selectedSubject.category}</div>
                <p className="text-xs text-muted-foreground">{selectedSubject.type}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
                <CardTitle className="text-sm font-medium">Marks</CardTitle>
                <CheckCircle className="size-4 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">{selectedSubject.totalMarks}</div>
                <p className="text-xs text-muted-foreground">Passing: {selectedSubject.passingMarks}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Subject Details</CardTitle>
              </CardHeader>

              <CardHeader className="space-y-4">
                <div className="flex items-center gap-2 justify-between">
                  <span className="text-sm text-muted-foreground">Department: </span>
                  <span className="text-sm">{selectedSubject.departmentName}</span>
                </div>

                <div className="flex items-center gap-2 justify-between">
                  <span className="text-sm text-muted-foreground">Created: </span>
                  <span className="text-sm">{format(selectedSubject.createdAt, "PPP")}</span>
                </div>

                <div className="flex items-center gap-2 justify-between">
                  <span className="text-sm text-muted-foreground">Last updated: </span>
                  <span className="text-sm">{format(selectedSubject.updatedAt, "PPP")}</span>
                </div>

                <div className="flex items-center gap-2 justify-between">
                  <span className="text-sm text-muted-foreground">Slug: </span>
                  <span className="text-sm font-medium">{selectedSubject.slug}</span>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Subject Properties</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 justify-between">
                  <span className="text-sm text-muted-foreground">Active: </span>
                  <span className="text-sm">
                    {selectedSubject.isActive ? (
                      <Badge variant="default">Yes</Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-2 justify-between">
                  <span className="text-sm text-muted-foreground">Optional: </span>
                  <span className="text-sm">
                    {selectedSubject.isOptional ? (
                      <Badge variant="default">Yes</Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-2 justify-between">
                  <span className="text-sm text-muted-foreground">Has Theory: </span>
                  <span className="text-sm">
                    {selectedSubject.hasTheory ? (
                      <Badge variant="default">Yes</Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-2 justify-between">
                  <span className="text-sm text-muted-foreground">Has Practical: </span>
                  <span className="text-sm">
                    {selectedSubject.hasPractical ? (
                      <Badge variant="default">Yes</Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-2 justify-between">
                  <span className="text-sm text-muted-foreground">Lab Required: </span>
                  <span className="text-sm">
                    {selectedSubject.labRequired ? (
                      <Badge variant="default">Yes</Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
