import { Contact, Prisma } from "@prisma/client";

// Base type
export type ContactItem = Contact;

export type ClassItem = Prisma.ClassGetPayload<{ include: { streams: true } }>;

export type StreamItem = Prisma.StreamGetPayload<{ include: { class: true } }>;

// Create types
export type ClassCreateProps = Pick<ClassItem, "title" | "slug">;
export type StreamCreateProps = Pick<StreamItem, "title" | "slug" | "classId">;

// Update types (all fields optional except ID)
export type ClassUpdateProps = Partial<ClassCreateProps>;
export type StreamUpdateProps = Partial<StreamCreateProps>;
