import { getServerSchool } from "@/actions/auth";
import { getAllClasses } from "@/actions/classes";
import { getAllParents } from "@/actions/parents";
import { getStudentNextSequence } from "@/actions/students";
import BulkStudentForm from "@/components/dashboard/forms/students/bulk-student-form";
import SingleStudentForm from "@/components/dashboard/forms/students/student-form";
import InfoBanner from "@/components/info-banner";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Users } from "lucide-react";

export default async function AdmissionTabs() {
  const school = await getServerSchool();

  const classes = (await getAllClasses(school?.id ?? "")) || [];
  const parents = (await getAllParents(school?.id ?? "")) || [];

  const nextSequence = (await getStudentNextSequence(school?.id ?? "")) || 0;

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <Tabs defaultValue="single" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger
            value="single"
            className="flex items-center justify-center space-x-2 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300 ease-in-out"
          >
            <UserPlus className="size-5" />
            <span className="font-semibold">Single Student Admission</span>
          </TabsTrigger>

          <TabsTrigger
            value="bulk"
            className="flex items-center justify-center space-x-2 py-3 data-[state=active]:bg-blue-600 
            data-[state=active]:text-white transition-all duration-300 ease-in-out"
          >
            <Users className="size-5" />
            <span className="font-semibold">Bulk Student Admission</span>
          </TabsTrigger>
        </TabsList>

        <Card className="border-t-4 border-blue-600 shadow">
          <CardContent className="p-6">
            <TabsContent value="single" className="mt-0">
              <InfoBanner
                message="Please Make sure you have already Created the Parent, Class and Stream for this student."
                type="warning"
              />
              <SingleStudentForm nextSeq={nextSequence} parents={parents} classes={classes} />
            </TabsContent>

            <TabsContent value="bulk" className="mt-0">
              <BulkStudentForm />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
