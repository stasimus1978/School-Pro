import { getAllContacts } from "@/actions/contacts";
import { columns } from "./columns";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import DataTable from "@/components/DataTableComponents/DataTable";

export default async function ContactsPage() {
  const contacts = (await getAllContacts()) || [];

  // console.log("contacts", contacts);

  return (
    <div className="p-8">
      <TableHeader title="Contacts" linkTitle="Add Contact" href="/contact-us" data={contacts} model="contacts" />
      <div className="py-8">
        <DataTable data={contacts} columns={columns} />
      </div>
    </div>
  );
}
