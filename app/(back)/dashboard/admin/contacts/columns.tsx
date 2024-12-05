"use client";

import { Checkbox } from "@/components/ui/checkbox";

import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Contact } from "@prisma/client";

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
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
      return <ActionColumn row={row} model="contact" editEndpoint={`#`} id={contact.id} />;
    },
  },
];
