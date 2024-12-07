"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
  BookIcon,
  GraduationCapIcon,
  UsersIcon,
  FlagIcon,
  HeartIcon,
  GlobeIcon,
  ClockIcon,
  Hash,
} from "lucide-react";

import { StudentItem } from "@/types/types";
import { format } from "date-fns";

interface StudentModalProps {
  student: StudentItem;
}

export function StudentInfoModal({ student }: StudentModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    // onEdit(student);
    setIsOpen(false);
  };

  const handleDelete = () => {
    // onDelete(student.id);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View Student</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Student Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 md:grid-cols-2">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={student.imageUrl} alt={student.name} />
              <AvatarFallback>
                {student.firstName[0]}
                {student.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">{student.name}</h2>
            <p className="text-sm text-gray-500">{student.email}</p>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center space-x-2">
              <Hash className="h-4 w-4 text-gray-500" />
              <span className="font-semibold">Student ID: {student.id}</span>
            </div>
            <div className="flex items-center space-x-2">
              <UserIcon className="h-4 w-4 text-gray-500" />
              <span>Roll No: {student.rollNo}</span>
            </div>
            <div className="flex items-center space-x-2">
              <UserIcon className="h-4 w-4 text-gray-500" />
              <span>Reg No: {student.regNo}</span>
            </div>
            <div className="flex items-center space-x-2">
              <PhoneIcon className="h-4 w-4 text-gray-500" />
              <span>{student.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPinIcon className="h-4 w-4 text-gray-500" />
              <span>{student.address}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <span>DOB: {format(student.dob, "PPP")}</span>
            </div>
          </div>
        </div>
        <div className="grid gap-4 py-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center space-x-2">
            <BookIcon className="h-4 w-4 text-gray-500" />
            <span>
              <strong>Class:</strong> {student?.classTitle || student.classId}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <GraduationCapIcon className="h-4 w-4 text-gray-500" />
            <span>
              <strong>Stream:</strong> {student?.streamTitle || student.streamId}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <UsersIcon className="h-4 w-4 text-gray-500" />
            <span>
              <strong>Parent:</strong> {student?.parentName || student.parentId}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPinIcon className="h-4 w-4 text-gray-500" />
            <span>
              <strong>State:</strong> {student.state}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <UserIcon className="h-4 w-4 text-gray-500" />
            <span>
              <strong>BCN:</strong> {student.BCN}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FlagIcon className="h-4 w-4 text-gray-500" />
            <span>
              <strong>Nationality:</strong> {student.nationality}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <HeartIcon className="h-4 w-4 text-gray-500" />
            <span>
              <strong>Religion:</strong> {student.religion}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <UserIcon className="h-4 w-4 text-gray-500" />
            <span>
              <strong>Gender:</strong> {student.gender}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-gray-500" />
            <span>
              <strong>Admission Date:</strong> {format(student.admissionDate, "PPP")}
            </span>
          </div>
        </div>
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <GlobeIcon className="h-4 w-4" />
              <span>Created: {format(student.createdAt, "PPP")}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ClockIcon className="h-4 w-4" />
              <span>Updated: {format(student.updatedAt, "PPP")}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <Button onClick={handleEdit}>Edit</Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
