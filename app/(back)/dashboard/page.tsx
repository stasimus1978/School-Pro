import { getAllAnalytics } from "@/actions/analytics";
import { getServerSchool, getServerUser } from "@/actions/auth";
import DashboardDetails from "@/components/dashboard/dashboard-detail";
import { WelcomeBanner } from "@/components/dashboard/welcome-message";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getServerUser();

  if (!user) {
    redirect("/login");
  }

  const school = await getServerSchool();
  const analytics = (await getAllAnalytics(school?.id ?? "")) || [];

  return (
    <div className="flex-1 space-y-4 p-8">
      <WelcomeBanner userName={user?.name} userRole={user.role} userSchool={user?.schoolName ?? ""} />

      <DashboardDetails analytics={analytics} />
    </div>
  );
}
