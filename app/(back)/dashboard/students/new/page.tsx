import BulkStudentForm from "@/components/dashboard/forms/students/bulk-student-form";
import SingleStudentForm from "@/components/dashboard/forms/students/student-form";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Users } from "lucide-react";

export default function AdmissionTabs() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Tabs defaultValue="single" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger
            value="single"
            className="flex items-center justify-center space-x-2 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300 ease-in-out"
          >
            <UserPlus className="size-5" />
            <span className="font-semibold">Single Admission</span>
          </TabsTrigger>

          <TabsTrigger
            value="bulk"
            className="flex items-center justify-center space-x-2 py-3 data-[state=active]:bg-blue-600 
            data-[state=active]:text-white transition-all duration-300 ease-in-out"
          >
            <Users className="size-5" />
            <span className="font-semibold">Bulk Admission</span>
          </TabsTrigger>
        </TabsList>

        <Card className="border-t-4 border-blue-600 shadow-lg">
          <CardContent className="p-6">
            <TabsContent value="single" className="mt-0">
              <SingleStudentForm />
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
