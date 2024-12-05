import { getAllClasses } from "@/actions/classes";
import ClassListing from "@/components/dashboard/class-listing";

export default async function AcademicsClassesPage() {
  const classes = await getAllClasses();

  return (
    <div className="">
      <ClassListing classes={classes} />
    </div>
  );
}
