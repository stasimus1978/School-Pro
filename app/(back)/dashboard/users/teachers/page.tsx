import { columns } from "./columns";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import DataTable from "@/components/DataTableComponents/DataTable";
import { getAllParents } from "@/actions/parents";

export default async function TeachersPage() {
  const teachers = (await getAllParents()) || [];

  console.log("Parents: ", teachers);

  return (
    <div className="p-8">
      <TableHeader
        title="Teachers"
        linkTitle="Add Teacher"
        href="/dashboard/users/teacher/new"
        data={teachers}
        model="teacher"
      />
      <div className="py-8">
        <DataTable data={teachers} columns={columns} />
      </div>
    </div>
  );
}
