import { getServerUser } from "@/actions/auth";
import SchoolOnboardingForm from "@/components/dashboard/forms/school/school-onboarding-form";
import { Card, CardContent } from "@/components/ui/card";
import { redirect } from "next/navigation";

export default async function SchoolOnboardingPage() {
  const user = await getServerUser();
  const role = user?.role;

  if (!user || role !== "SUPER_ADMIN") {
    redirect("/login");
  }

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
