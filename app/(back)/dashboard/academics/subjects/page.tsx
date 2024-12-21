import { getServerSchool } from "@/actions/auth";
import { getBriefDepartments } from "@/actions/departments";
import { getAllSubjects } from "@/actions/subjects";
import SubjectListing from "@/components/dashboard/subject-listing";

export default async function DepartmentsPage() {
  const school = await getServerSchool();

  const departments = (await getBriefDepartments(school?.id ?? "")) || [];

  const subjects = (await getAllSubjects(school?.id ?? "")) || [];

  return (
    <div className="">
      <SubjectListing
        subjects={subjects}
        departments={departments.map(item => {
          return {
            label: item.name,
            value: item.id,
          };
        })}
      />
    </div>
  );
}
