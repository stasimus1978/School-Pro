import { getAllStudents } from "@/actions/students";
import { columns } from "./columns";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import DataTable from "@/components/DataTableComponents/DataTable";

export default async function StudentsPage() {
  const student = (await getAllStudents()) || [];

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
