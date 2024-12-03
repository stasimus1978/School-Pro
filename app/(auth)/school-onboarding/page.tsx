import SchoolOnboardingForm from "@/components/dashboard/forms/school/school-onboarding";
import BulkStudentForm from "@/components/dashboard/forms/students/bulk-student-form";
import SingleStudentForm from "@/components/dashboard/forms/students/student-form";
import InfoBanner from "@/components/info-banner";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

export default function SchoolOnboardingPage() {
  return (
    <div className="">
      <div className="max-w-3xl mx-auto p-16">
        <Card className="border-t-4 border-blue-600 shadow">
          <CardContent className="p-6">
            <SchoolOnboardingForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
