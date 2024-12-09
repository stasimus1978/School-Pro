import { getAllDepartments } from "@/actions/departments";
import DepartmentListing from "@/components/dashboard/department-listing";

export default async function DepartmentsPage() {
  const departments = (await getAllDepartments()) || [];

  return (
    <div className="">
      <DepartmentListing departments={departments} />
    </div>
  );
}
