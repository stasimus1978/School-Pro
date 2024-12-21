import { getServerSchool } from "@/actions/auth";
import { getAllStudents } from "@/actions/students";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import DataTable from "@/components/DataTableComponents/DataTable";
import { columns } from "./columns";

export default async function StudentsPage() {
  const school = await getServerSchool();

  const student = (await getAllStudents(school?.id ?? "")) || [];

  console.log("Students: ", student);

  return (
    <div className="p-8">
      <TableHeader
        title="Students"
        linkTitle="Add Student"
        href="/dashboard/students/new"
        data={student}
        model="student"
      />
      <div className="py-8">
        <DataTable data={student} columns={columns} />
      </div>
    </div>
  );
}
