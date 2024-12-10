import { getServerUser } from "@/actions/users";
import AppSidebar from "@/components/dashboard/sidebar/app-sidebar";
import SidebarHeader from "@/components/dashboard/sidebar/sidebar-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getServerUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SidebarHeader />

          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
