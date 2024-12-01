import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StudentsPage() {
  return (
    <div className="">
      <h2 className="">Students Page</h2>
      <Button asChild>
        <Link href="/dashboard/students/new">New Student</Link>
      </Button>
    </div>
  );
}
