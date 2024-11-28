"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, MessageSquare, DollarSign, icons, BarChart2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "./section-header";

const features = [
  {
    icon: Users,
    tab: "Student",
    title: "Student Management",
    description:
      "Comprehensive student information system for managing enrollments, profiles, and academic records with ease",
    href: "/features/student-management",
    subFeatures: [
      "Digital student profiles with complete academic history",
      "Automated enrollment and registration process",
      "Parent portal access with real-time updates",
      "Student performance tracking and analytics",
      "Digital document management for student records",
      "Custom fields for additional student information",
      "Bulk student data import and export capabilities",
      "Student behavior and disciplinary record tracking",
    ],
    image: "/images/placeholder.jpg",
  },
  {
    icon: GraduationCap,
    tab: "Academic",
    title: "Academic Management",
    description:
      "Streamline curriculum planning, examinations, grading, and report card generation in one unified system",
    href: "/features/academic-management",
    subFeatures: [
      "Dynamic curriculum and syllabus management",
      "Automated grade calculation and GPA tracking",
      "Custom report card generation",
      "Assignment and homework management",
      "Online examination system with multiple question types",
      "Academic calendar management",
      "Course and class scheduling",
      "Learning resources distribution and management",
    ],
    image: "/images/placeholder.jpg",
  },
  {
    icon: DollarSign,
    tab: "Finance",
    title: "Financial Management",
    description:
      "Complete fee management system with online payments, invoicing, and comprehensive financial reporting",
    href: "/features/finance",
    subFeatures: [
      "Online fee payment gateway integration",
      "Automated invoice generation and distribution",
      "Payment reminder system",
      "Financial reporting and analytics",
      "Salary and payroll management",
      "Expense tracking and budgeting",
      "Scholarship  management",
      "Multiple payment method support",
    ],
    image: "/images/placeholder.jpg",
  },
  {
    icon: BarChart2,
    tab: "Analytics",
    title: "Analytics & Reports",
    description: "Powerful analytics tools for data-driven decision with customizable reporting and insights",
    href: "/features/analytics",
    subFeatures: [
      "Customizable dashboard with key metrics",
      "Performance trend analysis",
      "Financial reporting and analytics",
      "Attendance tracking and reporting",
      "Financial insights and forecasting",
      "Student progress tracking",
      "Staff performance analysis",
      "Custom report generation",
      "Data export in multiple formats",
    ],
    image: "/images/placeholder.jpg",
  },
];

export default function TabbedFeature() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="py-8">
        <SectionHeader
          title="Additional Features"
          heading="Основные возможности"
          description="Комплексное решение для управления вашим бизнесом с интуитивно понятным интерфейсом и мощным функционалом"
        />
      </div>
      <Tabs defaultValue={features[0].tab.toLowerCase()} className="space-y-8">
        <TabsList className="inline-flex h-auto w-full justify-start gap-4 rounded-none border-b bg-transparent p-0">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <TabsTrigger
                key={feature.tab}
                value={feature.tab.toLowerCase()}
                className="inline-flex items-center gap-2 border-b-2 border-transparent px-4 pb-4 pt-2 data-[state=active]:border-primary"
              >
                <Icon className="w-5 h-5 mr-2" />
                {feature.tab}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {features.map((feature) => (
          <TabsContent key={feature.tab} value={feature.tab.toLowerCase()} className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <h2 className="text-3xl tracking-tight font-bold">{feature.title}</h2>
                <p className="text-lg text-muted-foreground">{feature.description}</p>

                <Card>
                  <CardContent className="grid gap-4 p-6">
                    {feature.subFeatures.map((subFeature, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          {index + 1}
                        </div>
                        <span>{subFeature}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Button asChild>
                  <Link href={feature.href}>Learn More about {feature.title}</Link>
                </Button>
              </div>

              <div className="relative aspect-video overflow-hidden rounded-xl bg-muted lg:aspect-square">
                <Image
                  src={feature.image}
                  alt={`${feature.title} illustration`}
                  className="object-cover"
                  fill
                  priority
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
