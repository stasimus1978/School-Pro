import { getBriefDepartments } from "@/actions/departments";
import { getAllSubjects } from "@/actions/subjects";
import SubjectListing from "@/components/dashboard/subject-listing";

export default async function DepartmentsPage() {
  const departments = (await getBriefDepartments()) || [];

  const subjects = (await getAllSubjects()) || [];

  return (
    <div className="">
      <SubjectListing
        subjects={subjects}
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
