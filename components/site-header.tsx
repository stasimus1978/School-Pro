"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DollarSign,
  Bell,
  Menu,
  Users,
  GraduationCap,
  BookOpen,
  MessageSquare,
  ClipboardList,
  Calendar,
  BarChart2,
  Shield,
  FileText,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Logo from "./logo";

const features = [
  {
    icon: Users,
    title: "Student Management",
    description:
      "Comprehensive student information system for managing enrollments, profiles, academic records, and personalized learning paths",
    href: "/features/student-management",
  },
  {
    icon: GraduationCap,
    title: "Academic Management",
    description:
      "Advanced curriculum planning, course management, lesson scheduling, academic progress tracking, and adaptive learning support",
    href: "/features/academic-management",
  },
  {
    icon: BookOpen,
    title: "Learning Management System",
    description:
      "Integrated e-learning platform with online courses, interactive content, assignment submission, and digital learning resources",
    href: "/features/learning-management",
  },
  {
    icon: MessageSquare,
    title: "Communication Portal",
    description:
      "Unified communication platform with instant messaging, parent-teacher interaction, group discussions, and real-time collaboration tools",
    href: "/features/communication",
  },
  {
    icon: DollarSign,
    title: "Financial Management",
    description:
      "Comprehensive financial ecosystem with tuition management, scholarship tracking, expense monitoring, and integrated payment gateways",
    href: "/features/finance",
  },
  {
    icon: ClipboardList,
    title: "Human Resource Management",
    description:
      "Advanced staff recruitment, performance tracking, professional development planning, and comprehensive HR workflow management",
    href: "/features/staff-management",
  },
  {
    icon: Calendar,
    title: "Academic Calendar",
    description:
      "Dynamic scheduling system for academic events, exam timetables, extracurricular activities, and institutional planning",
    href: "/features/academic-calendar",
  },
  {
    icon: BarChart2,
    title: "Advanced Analytics",
    description:
      "Predictive analytics, student performance insights, institutional benchmarking, and comprehensive data visualization tools",
    href: "/features/analytics",
  },
  {
    icon: Shield,
    title: "Compliance & Security",
    description:
      "Multi-layered security infrastructure with advanced access controls, data privacy protocols, and regulatory compliance management",
    href: "/features/security",
  },
  {
    icon: FileText,
    title: "Examination Management",
    description:
      "End-to-end examination process management including digital exam creation, online proctoring, automated grading, and result analysis",
    href: "/features/examinations",
  },
  {
    icon: Bell,
    title: "Notification System",
    description:
      "Intelligent notification framework with personalized alerts, multi-channel communication, and customizable notification preferences",
    href: "/features/notifications",
  },
  {
    icon: Globe,
    title: "Multi-campus Management",
    description:
      "Centralized management system for multiple institutional branches with standardized processes and cross-campus reporting",
    href: "/features/multi-campus",
  },
];

export default function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const [showFeatures, setShowFeatures] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Logo variant="light" />

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[800px] p-4">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b">
                      <h4 className="text-lg font-medium">Features</h4>
                      <Link href="/features" className="text-sm text-blue-500 hover:underline">
                        View all
                      </Link>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      {features.map((feature, index) => (
                        <Link
                          key={index}
                          href={`/feature/${feature.title.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block group"
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-muted rounded-md group-hover:bg-muted/80">
                              <feature.icon className="h-6 w-6 text-blue-500" />
                            </div>
                            <div>
                              <h5 className="font-medium mb-1 group-hover:text-blue-500">{feature.title}</h5>
                              <p className="text-sm text-muted-foreground line-clamp-2">{feature.description}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium mb-1">Get started</h4>
                          <p className="text-sm text-muted-foreground">
                            Their food sources have decreased, and their numbers
                          </p>
                        </div>
                        <Button variant="secondary" asChild>
                          <Link href="/contact-us">Get started</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/#pricing" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/how-it-works" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    How it works
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild>
            <Link href="/contact-us">Book demo</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full p-0">
            <SheetHeader className="border-b p-4">
              <SheetTitle className="text-left">Navigation</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col py-4">
              <Link href="/" className="px-4 py-2 text-lg font-medium hover:bg-accent" onClick={() => setOpen(false)}>
                Home
              </Link>
              <button
                className="flex items-center justify-between px-4 py-2 text-lg font-medium hover:bg-accent text-left"
                onClick={() => setShowFeatures(!showFeatures)}
              >
                Features
                <ChevronDown className={cn("h-5 w-5 transition-transform", showFeatures && "rotate-180")} />
              </button>
              {showFeatures && (
                <div className="px-4 py-2 space-y-4">
                  {features.map((feature, index) => (
                    <Link
                      key={index}
                      href={`/feature/${feature.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex items-start gap-4 py-2"
                      onClick={() => setOpen(false)}
                    >
                      <div className="p-2 bg-muted rounded-md">
                        <feature.icon className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <h5 className="font-medium mb-1">{feature.title}</h5>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              <Link
                href="/#pricing"
                className="px-4 py-2 text-lg font-medium hover:bg-accent"
                onClick={() => setOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/how-it-works"
                className="px-4 py-2 text-lg font-medium hover:bg-accent"
                onClick={() => setOpen(false)}
              >
                How it works
              </Link>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
              <div className="grid gap-2">
                <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>
                  Log in
                </Button>
                <Button className="w-full" onClick={() => setOpen(false)}>
                  Sign up
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
