import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UsersParents() {
  return (
    <div className="">
      <Button asChild>
        <Link href={"/dashboard/users/parents/new"}>New Parent</Link>
      </Button>
    </div>
  );
}
