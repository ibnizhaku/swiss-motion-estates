import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
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

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(5,6,15,0.65)" : "rgba(5,6,15,0.0)",
          backdropFilter: scrolled ? "blur(20px) saturate(160%)" : "blur(0px)",
          borderColor: scrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 border-b"
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-16 flex items-center justify-between h-20 lg:h-24">
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-serif text-3xl lg:text-4xl tracking-tight text-gradient">
              LIVYA
            </span>
            <span className="text-[10px] uppercase tracking-widest-xl text-white/40 mt-1">
              Immobilienverwaltung GmbH
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10 text-[12px] uppercase tracking-widest-xl">
            {mainLinks.slice(0, 3).map((l) => (
              <NavItem key={l.to} to={l.to} label={l.label} active={location.pathname === l.to} />
            ))}
            <div
              className="relative"
              onMouseEnter={() => setMieterOpen(true)}
              onMouseLeave={() => setMieterOpen(false)}
            >
              <button className="flex items-center gap-1.5 text-white/80 hover:text-white transition">
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
                    <div className="glass-strong min-w-[220px] py-2">
                      {mieterLinks.map((l) => (
                        <Link
                          key={l.to}
                          to={l.to as any}
                          className="block px-5 py-3 text-[11px] uppercase tracking-widest-xl text-white/80 hover:text-white hover:bg-white/5 transition"
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

          <div className="hidden xl:block w-px" />

          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 -mr-2 text-white"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" strokeWidth={1.25} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-[#05060f]/95 backdrop-blur-xl"
          >
            <div className="aurora opacity-40" />
            <div className="relative flex flex-col h-full">
              <div className="flex items-center justify-between px-6 h-20 border-b border-white/10">
                <span className="font-serif text-3xl text-gradient">LIVYA</span>
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 -mr-2 text-white">
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
                    <Link to={l.to as any} className="font-serif text-4xl text-white">
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="px-8 py-8 border-t border-white/10 flex flex-col gap-3 text-[12px] uppercase tracking-widest-xl text-white/70">
                <a href="mailto:info@livya.ch" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" strokeWidth={1.25} /> info@livya.ch
                </a>
                <a href="tel:+41441234567" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" strokeWidth={1.25} /> +41 44 123 45 67
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
    <Link to={to as any} className="relative magnetic-link text-white/80 hover:text-white transition">
      {label}
      {active && (
        <motion.span
          layoutId="active-nav"
          className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-[#7c5cff] to-[#5ce7ff]"
        />
      )}
    </Link>
  );
}
