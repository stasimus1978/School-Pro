import { Contact, Parent, Prisma } from "@prisma/client";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";
import { Option, Options } from "react-tailwindcss-select/dist/components/type";

// Base type
export type ContactItem = Contact;

export type ClassItem = Prisma.ClassGetPayload<{ include: { streams: true } }>;

export type StreamItem = Prisma.StreamGetPayload<{ include: { class: true } }>;

export type ParentItem = Parent;

// Create types
export type ClassCreateProps = Pick<ClassItem, "title">;
export type StreamCreateProps = Pick<StreamItem, "title" | "slug" | "classId">;
export type ParentCreateProps = Omit<ParentItem, "id">; //& { profileImage: string;};

// Update types (all fields optional except ID)
export type ClassUpdateProps = Partial<ClassCreateProps>;
export type StreamUpdateProps = Partial<StreamCreateProps>;

//

export type SelectOptionProps = Option;

export type TypedRequestBody<T> = Omit<NextRequest, "json"> & {
  json: () => Promise<T>;
};
