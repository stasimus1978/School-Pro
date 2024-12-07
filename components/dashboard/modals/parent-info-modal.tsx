import { useState } from "react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Mail, Phone, Briefcase, MapPin, Calendar, Flag, MessageCircle } from "lucide-react";
import { ParentItem } from "@/types/types";

interface ParentInfoModalProps {
  parent: ParentItem;
  onEdit: () => void;
  onDelete: () => void;
}

export function ParentInfoModal({ parent, onEdit, onDelete }: ParentInfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View Parent Info</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Parent Information</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh] pr-4">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={parent.imageUrl} alt={`${parent.firstName} ${parent.lastName}`} />
              <AvatarFallback>
                {parent.firstName[0]}
                {parent.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">
              {parent.title} {parent.firstName} {parent.lastName}
            </h2>
            <p className="text-muted-foreground">{parent.relationship}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <InfoCard icon={<User className="h-5 w-5" />} label="National ID/Passport" value={parent.NIN} />
            <InfoCard icon={<User className="h-5 w-5" />} label="Gender" value={parent.gender} />
            <InfoCard icon={<Calendar className="h-5 w-5" />} label="Date of Birth" value={format(parent.dob, "PPP")} />
            <InfoCard icon={<Flag className="h-5 w-5" />} label="Nationality" value={parent.nationality} />
            <InfoCard icon={<Mail className="h-5 w-5" />} label="Email" value={parent.email} />
            <InfoCard icon={<Phone className="h-5 w-5" />} label="Phone" value={parent.phone} />
            <InfoCard icon={<MessageCircle className="h-5 w-5" />} label="WhatsApp" value={parent.whatsapNo || "N/A"} />
            <InfoCard icon={<Mail className="h-5 w-5" />} label="Contact Method" value={parent.contactMethod} />
            <InfoCard icon={<Briefcase className="h-5 w-5" />} label="Occupation" value={parent.occupation} />
            <InfoCard icon={<MapPin className="h-5 w-5" />} label="Address" value={parent.address} />
          </div>
          <div className="mt-6 text-sm text-muted-foreground">
            <p>Created: {format(parent.createdAt, "PPP")}</p>
            <p>Last Updated: {format(parent.updatedAt, "PPP")}</p>
          </div>
        </ScrollArea>
        <DialogFooter className="sm:justify-start">
          <Button
            variant="outline"
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onDelete();
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
