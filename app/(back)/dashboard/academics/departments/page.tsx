import { getServerSchool } from "@/actions/auth";
import { getAllDepartments } from "@/actions/departments";
import DepartmentListing from "@/components/dashboard/department-listing";

export default async function DepartmentsPage() {
  const school = await getServerSchool();

  const departments = (await getAllDepartments(school?.id || "")) || [];

  return (
    <div className="">
      <DepartmentListing departments={departments} />
    </div>
  );
}
