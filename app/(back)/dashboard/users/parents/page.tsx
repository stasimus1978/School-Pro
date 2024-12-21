import { getServerSchool } from "@/actions/auth";
import { getAllParents } from "@/actions/parents";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import DataTable from "@/components/DataTableComponents/DataTable";
import { columns } from "./columns";

export default async function ParentsPage() {
  const school = await getServerSchool();

  const parents = (await getAllParents(school?.id ?? "")) || [];

  console.log("Parents: ", parents);

  return (
    <div className="p-8">
      <TableHeader
        title="Parents"
        linkTitle="Add Parent"
        href="/dashboard/users/parents/new"
        data={parents}
        model="parent"
      />
      <div className="py-8">
        <DataTable data={parents} columns={columns} />
      </div>
    </div>
  );
}
