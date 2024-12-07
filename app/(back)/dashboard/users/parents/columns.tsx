"use client";

import Image from "next/image";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";

import { ColumnDef } from "@tanstack/react-table";
import { ParentItem } from "@/types/types";
import { ParentInfoModal } from "@/components/dashboard/modals/parent-info-modal";

export const columns: ColumnDef<ParentItem>[] = [
  {
    accessorKey: "user",
    header: "FullName/Relationship",
    cell: ({ row }) => {
      const parent = row.original;
      return (
        <div className="flex items-center gap-1" key={parent.id}>
          <Image
            src={parent.imageUrl}
            alt={parent.firstName}
            width={512}
            height={512}
            className="size-10 rounded-full"
          />

          <div className="">
            <h2 className="font-medium capitalize">
              {parent.firstName.toLowerCase()} {parent.lastName.toLowerCase()}
            </h2>
            <p className="text-xs text-muted-foreground">{parent.relationship}</p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "email-phone",
    header: "Email/Phone",
    cell: ({ row }) => {
      const parent = row.original;
      return (
        <div className="" key={parent.id}>
          <h2 className="font-medium">{parent.email.toLowerCase()}</h2>
          <p className="text-xs text-muted-foreground">{parent.phone}</p>
        </div>
      );
    },
  },

  { accessorKey: "nationality", header: "Nationality" },

  {
    accessorKey: "view",
    header: "View",
    cell: ({ row }) => <ParentInfoModal parent={row.original} />,
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
