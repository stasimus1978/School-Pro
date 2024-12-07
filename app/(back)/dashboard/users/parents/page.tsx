import { columns } from "./columns";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import DataTable from "@/components/DataTableComponents/DataTable";
import { getAllParents } from "@/actions/parents";

export default async function ParentsPage() {
  const parents = (await getAllParents()) || [];

  console.log("Parents: ", parents);

  return (
    <div className="p-8">
      <TableHeader
        title="Parents"
        linkTitle="Add Parent"
        href="/dashboard/users/parent/new"
        data={parents}
        model="parent"
      />
      <div className="py-8">
        <DataTable data={parents} columns={columns} />
      </div>
    </div>
  );
}
