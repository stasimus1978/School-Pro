import ContactUs from "@/components/frontend/contact-us";
import SectionHeader from "@/components/frontend/section-header";
import Logo from "@/components/logo";

export default function ContactUsPage() {
  return (
    <div className="py-12">
      <div className="py-6">
        <div className="flex items-center justify-center pb-4">
          <Logo variant="light" size="lg" />
        </div>
        <SectionHeader
          title=""
          heading="Get Your School Management System"
          description="Ready to transform your school's digital infrastructure? Fill out the form below and we'll help you get started with a customized solution tailored to your institution's needs."
        />
      </div>
      <ContactUs />
    </div>
  );
}
