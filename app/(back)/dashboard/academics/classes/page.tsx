import { getServerSchool } from "@/actions/auth";
import { getAllClasses } from "@/actions/classes";
import ClassListing from "@/components/dashboard/class-listing";

export default async function AcademicsClassesPage() {
  const school = await getServerSchool();

  // console.log("School: ", school);

  const classes = (await getAllClasses(school?.id ?? "")) || [];

  return (
    <div className="">
      <ClassListing classes={classes} />
    </div>
  );
}
