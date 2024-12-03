import HelpPage from "@/components/frontend/help-page";
import SectionHeader from "@/components/frontend/section-header";

export default function FrontHelpPage() {
  return (
    <div className="py-12">
      <SectionHeader
        title=""
        heading="Help Center & Resources"
        description="Find answers, learn best practices, and discover how to get the most out of your SchoolPro system. Browse through our frequently asked questions or explore our helpful articles to enhance your experience."
      />
      <HelpPage />
    </div>
  );
}
