import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import Logo from "@/components/logo";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  BarChart2,
  BookOpen,
  Bus,
  ChevronRight,
  DollarSign,
  GraduationCap,
  Key,
  LayoutDashboard,
  MessageSquare,
  Settings2,
  UserCog,
  Users,
} from "lucide-react";
import UserMenu from "./user-menu";

export default function AppSidebar() {
  const sidebarLinks = [
    {
      //Dashboard
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [{ title: "Overview", url: "/dashboard" }],
    },
    {
      // Student Management
      title: "Student Management",
      url: "/students",
      icon: Users,
      items: [
        { title: "Student Directory", url: "/dashboard/students" },
        { title: "Fees", url: "/dashboard/students/fees" },
        { title: "Student Ids", url: "/dashboard/students/ids" },
        { title: "Attendance", url: "/dashboard/students/attendance" },
      ],
    },
    {
      // Users
      title: "Users",
      url: "/dashboard/users",
      icon: Users,
      items: [
        { title: "Parents", url: "/dashboard/users/parents" },
        { title: "Teachers", url: "/dashboard/users/teachers" },
        { title: "Secretary", url: "/dashboard/users/secretary" },
      ],
    },
    {
      // Academics
      title: "Academics",
      url: "/dashboard/academics",
      icon: GraduationCap,
      items: [
        { title: "Classes and Streams", url: "/dashboard/academics/classes" },
        { title: "Subjects", url: "/dashboard/academics/subjects" },
        { title: "Department", url: "/dashboard/academics/departments" },
        { title: "Timetable", url: "/dashboard/academics/timetable" },
        { title: "Assignment", url: "/dashboard/academics/assignment" },
      ],
    },
    {
      // Staff Management
      title: "Staff Management",
      url: "/staff",
      icon: UserCog,
      items: [
        { title: "Staff Directory", url: "/staff/directory" },
        { title: "Attendance", url: "/staff/attendance" },
        { title: "Leave Management", url: "/staff/leave" },
        { title: "Performance", url: "/staff/performance" },
      ],
    },
    {
      // Communication
      title: "Communication",
      url: "/communication",
      icon: MessageSquare,
      items: [
        { title: "Messages", utl: "/communication/messages" },
        { title: "Announcements", url: "/communication/announcements" },
        { title: "Notice Board", url: "/communication/notices" },
        { title: "Emergency Alerts", url: "/communication/alerts" },
      ],
    },
    {
      // Finance
      title: "Finance",
      url: "/finance",
      icon: DollarSign,
      items: [
        { title: "Fee Management", url: "/finance/fees" },
        { title: "Payments", url: "/finance/payments" },
        { title: "Scholarships", url: "/finance/scholarships" },
        { title: "Reports", url: "/finance/reports" },
      ],
    },
    {
      // Transport
      title: "Transport",
      url: "/transport",
      icon: Bus,
      items: [
        { title: "Routes", url: "/transport/routes" },
        { title: "Tracking", url: "/transport/tracking" },
        { title: "Drivers", url: "/transport/drivers" },
        { title: "Maintenance", url: "/transport/maintenance" },
      ],
    },
    {
      // Resources
      title: "Resources",
      url: "/resources",
      icon: BookOpen,
      items: [
        { title: "Library", url: "/resources/library" },
        { title: "Inventory", url: "/resources/inventory" },
        { title: "Facilities", url: "/resources/facilities" },
        { title: "Assets", url: "/resources/assets" },
      ],
    },
    {
      // Reports & Analytics
      title: "Report & Analytics",
      url: "/reports",
      icon: BarChart2,
      items: [
        { title: "Academic Reports", url: "/reports/academic" },
        { title: "Financial Reports", url: "/reports/financial" },
        { title: "Custom Reports", url: "/reports/custom" },
        { title: "Analytics Dashboard", url: "/reports/analytics" },
      ],
    },
    {
      // Settings
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        { title: "School Profile", url: "/settings/profile" },
        { title: "User Management", url: "/settings/users" },
        { title: "System Settings", url: "/settings/system" },
        { title: "Backup & Security", url: "/settings/security" },
      ],
    },
    {
      // Admin only
      title: "Admin Only",
      url: "/dashboard/admin",
      icon: Key,
      items: [{ title: "Contacts", url: "/dashboard/admin/contacts" }],
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Logo variant="light" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sidebarLinks.map(item => (
              <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map(subItem => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenu />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
