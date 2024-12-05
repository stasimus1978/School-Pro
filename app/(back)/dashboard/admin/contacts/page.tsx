import { getAllContacts } from "@/actions/contacts";
import { Contact } from "@prisma/client";

export default async function ContactsPage() {
  const contacts: Contact[] = (await getAllContacts()) || [];

  return (
    <div className="p-8">
      <h2 className="">Contacts</h2>
    </div>
  );
}
