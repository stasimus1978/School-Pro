import { Contact } from "@prisma/client";
import {
  Briefcase,
  Building,
  Calendar,
  Globe,
  LucideIcon,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Users,
} from "lucide-react";
import React, { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface ContactInfoModalProps {
  contact: Contact;
  trigger?: ReactNode;
}

export default function ContactInfoModal({ contact, trigger }: ContactInfoModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const infoCards = [
    { icon: Mail, label: "Email", value: contact.email },
    { icon: Phone, label: "Phone", value: contact.phone },
    { icon: Building, label: "School", value: contact.school },
    { icon: MapPin, label: "Country", value: contact.country },
    { icon: Globe, label: "School Page", value: contact.schoolPage },
    { icon: Users, label: "Students", value: contact.students.toString() },
    { icon: Briefcase, label: "Role", value: contact.role },
    { icon: Calendar, label: "Joined", value: new Date(contact.createdAt).toLocaleDateString() },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger || <Button variant="outline">View</Button>}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${contact.fullName}`}
                alt={contact.fullName}
              />

              <AvatarFallback>
                {contact.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="">
              <h2 className="text-2xl font-bold">{contact.fullName}</h2>
              <Badge variant="secondary" className="mt-1">
                Via {contact.media}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {infoCards.map((info) => (
            <InfoCard key={info.label} icon={info.icon} title={info.label} content={info.value} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoCard({
  icon: Icon,
  title,
  content,
  isLink = false,
}: {
  icon: LucideIcon;
  title: string;
  content: string;
  isLink?: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2">
          <Icon className="size-6" />
          <h3 className="font-semibold">{title}</h3>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          {isLink ? (
            <a href={content} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {content}
            </a>
          ) : (
            content
          )}
        </p>
      </CardContent>
    </Card>
  );
}
