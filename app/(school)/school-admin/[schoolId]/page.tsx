import SchoolAdminForm from "@/components/dashboard/forms/school/school-admin-form";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";

type SchoolAdminProps = {
  params: Promise<{ schoolId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SchoolAdmin({ params, searchParams }: SchoolAdminProps) {
  const schoolId = (await params).schoolId;
  const name = (await searchParams).name;

  if (!schoolId || !name) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-16">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-6">
          <SchoolAdminForm schoolId={schoolId} schoolName={name as string} />
        </CardContent>
      </Card>
    </div>
  );
}
