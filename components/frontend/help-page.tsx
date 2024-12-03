"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Card, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const articles = [
  {
    id: 1,
    title: "Getting Started Guide",
    excerpt: "Learn the basics of using our platform",
    category: "Basics",
  },
  {
    id: 2,
    title: "Account Management",
    excerpt: "How to manage your account settings",
    category: "Account",
  },
  {
    id: 3,
    title: "Troubleshooting Common Issues",
    excerpt: "Solutions to frequent problems",
    category: "Support",
  },
];

const faqs = [
  {
    question: "What os SchoolPro?",
    answer:
      "SchoolPro is a platform that helps schools manage their students, teachers, and courses. It also provides tools for communication and collaboration.",
  },
  {
    question: "Can SchoolPro adapt to my school's unique requirements?",
    answer:
      "Yes! SchoolPro is highly customizable and can be tailored to fit the unique needs of your school. You can create custom fields, workflows, and reports to match your existing processes. Our support team is also available to help you with any customization needs. Just reach out to us!",
  },
  {
    question: "What are the system requirements for using SchoolPro?",
    answer:
      "SchoolPro is a cloud-based platform, so you don't need to install any software on your computer. All you need is a modern web browser and an internet connection. SchoolPro is compatible with all major browsers, including Chrome, Firefox, Safari, and Edge. If you're using an older browser, we recommend updating to the latest version for the best experience. If you have any questions about compatibility, feel free to reach out to our support team. We're happy to help!",
  },
  {
    question: "How can I migrate my exiting school data to SchoolPro",
    answer:
      "Migrating your existing school data to SchoolPro is easy! Our support team can help you import your data from spreadsheets, databases, or other school management systems. Just reach out to us, and we'll guide you through the process. We'll make sure your data is transferred accurately and securely, so you can start using SchoolPro with confidence. If you have any questions about data migration, don't hesitate to ask. We're here to help!",
  },
  {
    question: "What kind of support does SchoolPro offer?",
    answer:
      "SchoolPro offers a range of support options to help you get the most out of our platform. Our support team is available via email, chat, and phone to answer your questions and provide assistance. We also have a comprehensive knowledge base with articles, tutorials, and videos to help you learn how to use SchoolPro. If you need more personalized support, we offer training sessions, onboarding assistance, and custom development services. Whatever you need, we're here to help you succeed with SchoolPro! If you have any questions or need assistance, don't hesitate to reach out to our support team. We're always happy to help!",
  },
  {
    question: "Do I need expensive training to use SchoolPro?",
    answer:
      "No! SchoolPro is designed to be easy to use, so you can get started quickly without expensive training. Our platform is intuitive and user-friendly, with a clean and modern interface that makes it easy to find what you need. We also provide a range of resources to help you learn how to use SchoolPro, including articles, tutorials, and videos. If you have any questions or need assistance, our support team is always available to help. We're here to make sure you have a great experience with SchoolPro, so you can focus on what matters most: educating your students! If you have any questions or need assistance, don't hesitate to reach out to us. We're here to help you succeed with SchoolPro!",
  },
  {
    question: "How much does SchoolPro cost?",
    answer:
      "SchoolPro offers a range of pricing plans to fit schools of all sizes and budgets. Our plans are flexible and scalable, so you can choose the one that best meets your needs. We also offer a free trial so you can try SchoolPro before you buy. If you have any questions about pricing or need help choosing a plan, don't hesitate to reach out to our sales team. We're here to help you find the right solution for your school! If you have any questions about pricing or need assistance, don't hesitate to reach out to us. We're here to help you succeed with SchoolPro! If you have any questions or need assistance, don't hesitate to reach out to our support team. We're always happy to help!",
  },
  {
    question: "Is there a long-term contact requirement?",
    answer:
      "No! SchoolPro is a flexible platform that doesn't require a long-term contract. You can cancel your subscription at any time without penalty. We believe in earning your business every month, so we work hard to provide a great experience that keeps you coming back. If you have any questions about our terms or need assistance with your account, don't hesitate to reach out to our support team. We're here to help you succeed with SchoolPro! If you have any questions or need assistance, don't hesitate to reach out to us. We're always happy to help! If you have any questions or need assistance, don't hesitate to reach out to our support team. We're always happy to help!",
  },
  {
    question: "How does SchoolPro ensure my school's data security?",
    answer:
      "SchoolPro takes data security seriously and has implemented a range of measures to protect your school's data. Our platform uses encryption to secure your data in transit and at rest, and we regularly audit our systems to ensure they meet industry standards. We also provide tools to help you control access to your data and monitor who has access. If you have any questions about data security or need assistance with your account, don't hesitate to reach out to our support team. We're here to help you keep your school's data safe! If you have any questions or need assistance, don't hesitate to reach out to us. We're always happy to help! If you have any questions or need assistance, don't hesitate to reach out to our support team. We're always happy to help!",
  },
  {
    question: "What payments methods does SchoolPro accept?",
    answer:
      "SchoolPro accepts a range of payment methods, including credit cards, debit cards, and bank transfers. We also offer invoicing for schools that prefer to pay by check or wire transfer. If you have any questions about payment methods or need assistance with your account, don't hesitate to reach out to our sales team. We're here to help you find the right solution for your school! If you have any questions about payment methods or need assistance, don't hesitate to reach out to us. We're here to help you succeed with SchoolPro! If you have any questions or need assistance, don't hesitate to reach out to our support team. We're always happy to help! If you have any questions or need assistance, don't hesitate to reach out to our support team. We're always happy to help!",
  },
  {
    question: "Can SchoolPro be installed on our own school's servers?",
    answer:
      "SchoolPro is a cloud-based platform that is hosted on our secure servers. We do not offer an on-premise installation option at this time. Hosting SchoolPro in the cloud allows us to provide a reliable and scalable service that is accessible from anywhere with an internet connection. If you have any questions about hosting or need assistance with your account, don't hesitate to reach out to our support team. We're here to help you succeed with SchoolPro! If you have any questions or need assistance, don't hesitate to reach out to us. We're always happy to help! If you have any questions or need assistance, don't hesitate to reach out to our support team. We're always happy to help! If you have any questions or need assistance, don't hesitate to reach out to our support team. We're always happy to help!",
  },
  {
    question: "Do you offer custom feature development?",
    answer:
      "While we don't offer custom development services, we do have a public API that you can use to build custom integrations. If you need help with this, feel free to reach out to our support team. We're happy to help!",
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Articles Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Help Articles</h2>
        <div className="relative mb-6">
          <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground size-4" />
          <Input className="pl-10" placeholder="Search articles..." onChange={(e) => setSearchQuery(e.target.value)} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <Link href="#" key={article.id}>
              <Card className="hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">{article.title}</CardTitle>

                  <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="mb-16 bg-blue-50 p-8 rounded-lg">
        <div className="text-center mb-8">
          <h3 className="text-blue-500 font-medium mb-2">FREQUENTLY ASKED QUESTIONS</h3>

          <h2 className="text-3xl font-bold">
            You ask? We <span className="italic">answer</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger title={faq.question}>
                <p className="text-muted-foreground">{faq.question}</p>
              </AccordionTrigger>

              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
