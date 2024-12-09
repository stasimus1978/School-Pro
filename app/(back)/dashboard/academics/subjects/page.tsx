import { getBriefDepartments } from "@/actions/departments";
import SubjectListing from "@/components/dashboard/subject-listing";

export default async function DepartmentsPage() {
  const departments = (await getBriefDepartments()) || [];
  return (
    <div className="">
      <SubjectListing
        departments={departments.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        })}
      />
    </div>
  );
}
