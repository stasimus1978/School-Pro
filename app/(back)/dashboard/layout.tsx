import AppSidebar from "@/components/dashboard/sidebar/app-sidebar";
import SidebarHeader from "@/components/dashboard/sidebar/sidebar-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
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
