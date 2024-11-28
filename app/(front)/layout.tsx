import SiteFooter from "@/components/frontend/site-footer";
import SiteHeader from "@/components/site-header";
import { ReactNode } from "react";

export default function FrontLayout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
