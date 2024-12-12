import { getServerUser } from "@/actions/auth";
import DashboardDetail from "@/components/dashboard/dashboard-detail";
import { WelcomeBanner } from "@/components/dashboard/welcome-message";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getServerUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex-1 space-y-4 p-4">
      <WelcomeBanner
        userName={user?.name}
        userRole={user.role}
        userSchool={user?.schoolName ?? ""}
      />

      <DashboardDetail />
    </div>
  );
}
