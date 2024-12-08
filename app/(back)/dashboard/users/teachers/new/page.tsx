import ParentForm from "@/components/dashboard/forms/users/parent-form";
import { Card, CardContent } from "@/components/ui/card";

export default function AdmissionTabs() {
  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-6">
          <ParentForm />
        </CardContent>
      </Card>
    </div>
  );
}
