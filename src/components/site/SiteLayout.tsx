import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { MobileQuickBar } from "./MobileQuickBar";
import { SmoothScroll } from "./SmoothScroll";
import { PageTransition } from "./PageTransition";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grain min-h-screen flex flex-col bg-white text-[#1a1a1a]">
      <SmoothScroll />
      <Navbar />
      <div className="flex-1 pb-16 lg:pb-0">
        <PageTransition>{children}</PageTransition>
      </div>
      <Footer />
      <MobileQuickBar />
    </div>
  );
}

export function Section({
  children,
  className = "",
  alt = false,
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  alt?: boolean;
  dark?: boolean;
}) {
  const bg = dark ? "bg-[#1a1a1a] text-white" : alt ? "bg-[#f5f5f3]" : "bg-white";
  return (
    <section className={`${bg} ${className}`}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-16 py-24 lg:py-40">
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className={`flex items-center gap-3 text-[11px] uppercase tracking-widest-xl ${dark ? "text-white/60" : "text-[#9a9a9a]"}`}>
      <span className="w-8 h-px bg-current" />
      {children}
    </div>
  );
}
