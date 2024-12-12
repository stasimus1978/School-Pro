import { notFound } from "next/navigation";

type SchoolAdminProps = {
  params: Promise<{ schoolId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SchoolAdmin({ params, searchParams }: SchoolAdminProps) {
  const schoolId = (await params).schoolId;
  const name = (await searchParams).name;

  if (!schoolId) {
    return notFound();
  }
  return (
    <div className="">
      <p>School ID: {schoolId}</p>
      <p>School name: {name}</p>
    </div>
  );
}
