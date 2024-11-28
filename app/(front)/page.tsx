import DashboardPreview from "@/components/frontend/dashboard-preview";
import HeroSection from "@/components/frontend/hero-section";
import LogoCloud from "@/components/frontend/logo-cloud";

export default function HomePage() {
  return (
    <main className="">
      <HeroSection />
      <LogoCloud />
      <DashboardPreview />
    </main>
  );
}
