import { getServerSchool } from "@/actions/auth";
import { getAllTeachers } from "@/actions/teachers";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import DataTable from "@/components/DataTableComponents/DataTable";
import { columns } from "./columns";

export default async function TeachersPage() {
  const school = await getServerSchool();
  const teachers = (await getAllTeachers(school?.id ?? "")) || [];

  console.log("Teachers: ", teachers);

  return (
    <div className="p-8">
      <TableHeader
        title="Teachers"
        linkTitle="Add Teacher"
        href="/dashboard/users/teachers/new"
        data={teachers}
        model="teacher"
      />
      <div className="py-8">
        <DataTable data={teachers} columns={columns} />
      </div>
    </div>
  );
}
