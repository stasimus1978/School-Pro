import { getServerUser } from "@/actions/auth";
import Login from "@/components/frontend/auth/login";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getServerUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="">
      <Login />
    </div>
  );
}
