import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ChevronDown,
  FileText,
  Mail,
  Menu,
  Phone,
  PenTool,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const mainLinks = [
  { to: "/", label: "Startseite" },
  { to: "/ueber-uns", label: "Über uns" },
  { to: "/eigentuemer", label: "Eigentümer" },
  { to: "/objekte", label: "Objekte" },
  { to: "/kontakt", label: "Kontakt" },
];


const mieterLinks = [
  { to: "/schadenmeldung", label: "Schadenmeldung" },
  { to: "/mieter-dokumente", label: "Dokumente" },
  { to: "/notfall", label: "Notfall" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mieterOpen, setMieterOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Top utility row */}
      <div className="hidden md:block bg-[#1a1a1a] text-white text-[11px] uppercase tracking-widest-xl">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 flex justify-end items-center gap-8 h-10">
          <Link to="/schadenmeldung" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition">
            <PenTool className="w-3 h-3" strokeWidth={1.25} /> Schadenmeldung
          </Link>
          <Link to="/mieter-dokumente" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition">
            <FileText className="w-3 h-3" strokeWidth={1.25} /> Dokumente
          </Link>
          <Link to="/notfall" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition">
            <AlertCircle className="w-3 h-3" strokeWidth={1.25} /> Notfall
          </Link>
        </div>
      </div>

      {/* Main nav */}
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,1)",
          backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
        }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-50 border-b border-[#e8e8e6]"
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-16 flex items-center justify-between h-20 lg:h-24">
          {/* Brand */}
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-serif text-3xl lg:text-4xl tracking-tight">LIVYA</span>
            <span className="text-[10px] uppercase tracking-widest-xl text-[#9a9a9a] mt-1">
              Immobilienverwaltung GmbH
            </span>
          </Link>

          {/* Center links */}
          <nav className="hidden lg:flex items-center gap-10 text-[12px] uppercase tracking-widest-xl">
            {mainLinks.slice(0, 3).map((l) => (
              <NavItem key={l.to} to={l.to} label={l.label} active={location.pathname === l.to} />
            ))}
            <div
              className="relative"
              onMouseEnter={() => setMieterOpen(true)}
              onMouseLeave={() => setMieterOpen(false)}
            >
              <button className="flex items-center gap-1.5 text-[#1a1a1a] hover:opacity-60 transition">
                Mieter <ChevronDown className="w-3 h-3" strokeWidth={1.5} />
              </button>
              <AnimatePresence>
                {mieterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                  >
                    <div className="bg-white border border-[#e8e8e6] min-w-[220px] py-2">
                      {mieterLinks.map((l) => (
                        <Link
                          key={l.to}
                          to={l.to as any}
                          className="block px-5 py-3 text-[11px] uppercase tracking-widest-xl hover:bg-[#f5f5f3] transition"
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {mainLinks.slice(3).map((l) => (
              <NavItem key={l.to} to={l.to} label={l.label} active={location.pathname === l.to} />
            ))}
          </nav>

          {/* Right contact */}
          <div className="hidden xl:flex items-center gap-6 text-[11px] uppercase tracking-widest-xl">
            <a href="mailto:info@livya.ch" className="flex items-center gap-2 magnetic-link">
              <Mail className="w-3.5 h-3.5" strokeWidth={1.25} /><span>info@livya.ch</span>
            </a>
            <a href="tel:+41441234567" className="flex items-center gap-2 magnetic-link">
              <Phone className="w-3.5 h-3.5" strokeWidth={1.25} /><span>+41 44 123 45 67</span>
            </a>
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 -mr-2"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" strokeWidth={1.25} />
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 h-20 border-b border-[#e8e8e6]">
                <span className="font-serif text-3xl">LIVYA</span>
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 -mr-2">
                  <X className="w-6 h-6" strokeWidth={1.25} />
                </button>
              </div>
              <nav className="flex-1 px-8 py-12 flex flex-col gap-6">
                {[...mainLinks, ...mieterLinks].map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                  >
                    <Link to={l.to as any} className="font-serif text-4xl">
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="px-8 py-8 border-t border-[#e8e8e6] flex flex-col gap-3 text-[12px] uppercase tracking-widest-xl">
                <a href="mailto:info@livya.ch" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" strokeWidth={1.25} /><span>info@livya.ch</span>
                </a>
                <a href="tel:+41441234567" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" strokeWidth={1.25} /><span>+41 44 123 45 67</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavItem({ to, label, active }: { to: string; label: string; active: boolean }) {
  return (
    <Link to={to as any} className="relative magnetic-link text-[#1a1a1a]">
      {label}
      {active && (
        <motion.span
          layoutId="active-nav"
          className="absolute -bottom-1 left-0 right-0 h-px bg-[#1a1a1a]"
        />
      )}
    </Link>
  );
}
