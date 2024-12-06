"use client";

import { Checkbox } from "@/components/ui/checkbox";

import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Contact } from "@prisma/client";
import ContactInfoModal from "@/components/DataTableColumns/ContactCard";

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "user",
    header: "Name/School",
    cell: ({ row }) => {
      const contact = row.original;
      return (
        <div className="" key={contact.id}>
          <h2 className="font-medium capitalize">{contact.fullName.toLowerCase()}</h2>
          <p className="text-xs text-muted-foreground">{contact.school}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "email-phone",
    header: "Email/Phone",
    cell: ({ row }) => {
      const contact = row.original;
      return (
        <div className="" key={contact.id}>
          <h2 className="font-medium">{contact.email.toLowerCase()}</h2>
          <p className="text-xs text-muted-foreground">{contact.phone}</p>
        </div>
      );
    },
  },

  { accessorKey: "country", header: "Country" },

  {
    accessorKey: "view",
    header: "View",
    cell: ({ row }) => <ContactInfoModal contact={row.original} />,
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
