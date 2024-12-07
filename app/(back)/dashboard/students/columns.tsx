"use client";

import Image from "next/image";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import DateColumn from "@/components/DataTableColumns/DateColumn";

import { ColumnDef } from "@tanstack/react-table";
import { StudentItem } from "@/types/types";
import { StudentInfoModal } from "@/components/dashboard/modals/student-info-modal";

export const columns: ColumnDef<StudentItem>[] = [
  {
    accessorKey: "student",
    header: "FullName/Relationship",
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="flex items-center gap-1" key={student.id}>
          <Image
            src={student.imageUrl}
            alt={student.firstName}
            width={512}
            height={512}
            className="size-10 rounded-full"
          />

          <div className="">
            <h2 className="font-medium capitalize">
              {student.firstName.toLowerCase()} {student.lastName.toLowerCase()}
            </h2>
            <p className="text-xs text-muted-foreground">{student.email}</p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "email-phone",
    header: "Email/Phone",
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="" key={student.id}>
          <h2 className="font-medium">{student.email.toLowerCase()}</h2>
          <p className="text-xs text-muted-foreground">{student.phone}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "class-stream",
    header: "Email/Phone",
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="" key={student.id}>
          <h2 className="font-medium">{student.classTitle ?? ""}</h2>
          <p className="text-xs text-muted-foreground">{student.streamTitle ?? ""}</p>
        </div>
      );
    },
  },

  { accessorKey: "nationality", header: "Nationality" },

  {
    accessorKey: "view",
    header: "View",
    cell: ({ row }) => <StudentInfoModal student={row.original} />,
  },

  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const contact = row.original;
      return <ActionColumn row={row} model="parent" editEndpoint={`#`} id={contact.id} />;
    },
  },
];
