import { useState } from "react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Calendar,
  Flag,
  MessageCircle,
  GraduationCap,
  Building,
  Clock,
} from "lucide-react";
import { Teacher } from "@prisma/client";

interface TeacherInfoModalProps {
  teacher: Teacher;
}

export function TeacherInfoModal({ teacher }: TeacherInfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View Teacher Info</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Teacher Information</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh] pr-4">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={teacher.imageUrl || ""} alt={`${teacher.firstName} ${teacher.lastName}`} />
              <AvatarFallback>
                {teacher.firstName[0]}
                {teacher.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">
              {teacher.title} {teacher.firstName} {teacher.lastName}
            </h2>
            <p className="text-muted-foreground">{teacher.designation}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <InfoCard icon={<User className="h-5 w-5" />} label="National ID" value={teacher.NIN} />
            <InfoCard icon={<User className="h-5 w-5" />} label="Gender" value={teacher.gender} />
            <InfoCard
              icon={<Calendar className="h-5 w-5" />}
              label="Date of Birth"
              value={format(teacher.dateOfBirth, "PPP")}
            />
            <InfoCard icon={<Flag className="h-5 w-5" />} label="Nationality" value={teacher.nationality} />
            <InfoCard icon={<Mail className="h-5 w-5" />} label="Email" value={teacher.email} />
            <InfoCard icon={<Phone className="h-5 w-5" />} label="Phone" value={teacher.phone} />
            <InfoCard
              icon={<MessageCircle className="h-5 w-5" />}
              label="WhatsApp"
              value={teacher.whatsapNo || "N/A"}
            />
            <InfoCard icon={<Mail className="h-5 w-5" />} label="Contact Method" value={teacher.contactMethod} />
            <InfoCard icon={<Briefcase className="h-5 w-5" />} label="Employee ID" value={teacher.employeeId} />
            <InfoCard
              icon={<Calendar className="h-5 w-5" />}
              label="Date of Joining"
              value={format(teacher.dateOfJoining, "PPP")}
            />
            <InfoCard
              icon={<GraduationCap className="h-5 w-5" />}
              label="Qualification"
              value={teacher.qualification}
            />
            <InfoCard icon={<Building className="h-5 w-5" />} label="Department" value={teacher.departmentName} />
            <InfoCard
              icon={<GraduationCap className="h-5 w-5" />}
              label="Main Subject"
              value={teacher.mainSubject || "N/A"}
            />
            <InfoCard
              icon={<Clock className="h-5 w-5" />}
              label="Experience"
              value={`${teacher.experience || 0} years`}
            />
            <InfoCard icon={<MapPin className="h-5 w-5" />} label="Address" value={teacher.address || "N/A"} />
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Subjects</h3>
            <div className="flex flex-wrap gap-2">
              {teacher.subjects.map((subject, index) => (
                <span key={index} className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
                  {subject}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 text-sm text-muted-foreground">
            <p>Created: {format(teacher.createdAt, "PPP")}</p>
            <p>Last Updated: {format(teacher.updatedAt, "PPP")}</p>
          </div>
        </ScrollArea>
        <DialogFooter className="sm:justify-start">
          <Button
            variant="outline"
            onClick={() => {
              //   onEdit();
              setIsOpen(false);
            }}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              //   onDelete();
              setIsOpen(false);
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoCard({ icon, label, value }: InfoCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center space-x-4 p-4">
        {icon}
        <div>
          <p className="text-sm font-medium leading-none">{label}</p>
          <p className="text-sm text-muted-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
