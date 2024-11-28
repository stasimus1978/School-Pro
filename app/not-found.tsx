"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Home, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4">
      <Card className="w-full max-w-2xl text-center">
        <CardContent className="pt-16">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-destructive/90 p-6">
              <Terminal className="w-12 h-12 text-destructive-foreground" aria-hidden="true" />
            </div>
          </div>

          <h1 className="mb-4 md:text-5xl text-3xl font-bold tracking-tight">404 - Page Not Found</h1>

          <p className="mb-8 text-lg text-muted-foreground">
            Oops! The page you&apos;re looking for does&apos;t exist. It might have been moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:justify-center">
            <Button asChild>
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Link>
            </Button>

            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
            </Button>
          </div>
        </CardContent>

        <CardFooter className="justify-center pb-16 pt-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} SchoolPro. All rights reserved.
        </CardFooter>
      </Card>
    </main>
  );
}
