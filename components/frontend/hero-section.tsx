import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import SmallTitle from "./small-title";

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] w-full flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-8">
        <SmallTitle title="Welcome to SchoolPro" />

        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl mx-auto">
          Your Complete School Management Solution
        </h1>

        <p className="mx-auto max-w-[700px] text-muted-foreground text-lg sm:text-xl">
          From admissions to academics, simplify every aspect of school administration with our comprehensive and
          user-friendly platform
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button className="rounded-full h-12 px-6 text-base">
            Get started
            <ArrowRight className="size-4 ml-2" />
          </Button>

          <Button size="lg" variant="outline" className="h-12 px-6 text-base">
            See all features
            <ArrowRight className="size-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
