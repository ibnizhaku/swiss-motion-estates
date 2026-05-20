import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { MobileQuickBar } from "./MobileQuickBar";
import { SmoothScroll } from "./SmoothScroll";
import { PageTransition } from "./PageTransition";
import { CustomCursor } from "./CustomCursor";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grain min-h-screen flex flex-col bg-[#05060f] text-white relative">
      <SmoothScroll />
      <CustomCursor />
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
  const bg = dark
    ? "bg-black"
    : alt
    ? "bg-gradient-to-b from-[#0a0b18] via-[#08091a] to-[#05060f]"
    : "bg-[#05060f]";
  return (
    <section className={`relative ${bg} ${className}`}>
      <div className="relative max-w-[1600px] mx-auto px-6 md:px-8 lg:px-16 py-24 lg:py-40">
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 text-[11px] uppercase tracking-widest-xl ${
        dark ? "text-white/60" : "text-white/50"
      }`}
    >
      <span className="w-8 h-px bg-gradient-to-r from-[#7c5cff] to-[#5ce7ff]" />
      {children}
    </div>
  );
}
