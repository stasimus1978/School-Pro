"use client";

import Image from "next/image";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";

import { ColumnDef } from "@tanstack/react-table";
import { ParentItem, TeacherItem } from "@/types/types";
import { ParentInfoModal } from "@/components/dashboard/modals/parent-info-modal";
import { TeacherInfoModal } from "@/components/dashboard/modals/teacher-info-modal";

export const columns: ColumnDef<TeacherItem>[] = [
  {
    accessorKey: "teacher",
    header: "FullName/Relationship",
    cell: ({ row }) => {
      const teacher = row.original;
      return (
        <div className="flex items-center gap-1" key={teacher.id}>
          <Image
            src={teacher.imageUrl || "/images/avatar.png"}
            alt={teacher.firstName}
            width={512}
            height={512}
            className="size-10 rounded-full"
          />

          <div className="">
            <h2 className="font-medium capitalize">
              {teacher.firstName.toLowerCase()} {teacher.lastName.toLowerCase()}
            </h2>
            <p className="text-xs text-muted-foreground">{teacher.employeeId}</p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "email-phone",
    header: "Email/Phone",
    cell: ({ row }) => {
      const teacher = row.original;
      return (
        <div className="" key={teacher.id}>
          <h2 className="font-medium">{teacher.email.toLowerCase()}</h2>
          <p className="text-xs text-muted-foreground">{teacher.phone}</p>
        </div>
      );
    },
  },

  { accessorKey: "nationality", header: "Nationality" },

  {
    accessorKey: "view",
    header: "View",
    cell: ({ row }) => <TeacherInfoModal teacher={row.original} />,
  },

  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const teacher = row.original;
      return <ActionColumn row={row} model="teacher" editEndpoint={`#`} id={teacher.id} />;
    },
  },
];
