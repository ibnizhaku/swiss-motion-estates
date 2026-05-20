import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, Building2, FileCheck, Heart, Shield } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eyebrow, Section } from "../components/site/SiteLayout";
import { Reveal, Stagger, itemVariants } from "../components/site/Reveal";
import { MagneticButton } from "../components/site/MagneticButton";
import { HeroCanvas } from "../components/site/HeroCanvas";
import { TiltCard } from "../components/site/TiltCard";

export const Route = createFileRoute("/")({
  component: Home,
});

const services = [
  {
    icon: Building2,
    title: "Bewirtschaftung",
    body: "Vollumfängliche Betreuung Ihrer Liegenschaft — von der Vermietung bis zur jährlichen Abrechnung.",
  },
  {
    icon: FileCheck,
    title: "Stockwerkeigentum",
    body: "Professionelle Verwaltung von Eigentümergemeinschaften mit transparenter Kommunikation.",
  },
  {
    icon: Shield,
    title: "Erstvermietung",
    body: "Strategische Erstvermietung mit massgeschneiderter Vermarktung für Neubauprojekte.",
  },
  {
    icon: Heart,
    title: "Persönliche Beratung",
    body: "Diskrete, langfristige Begleitung Ihres Immobilienvermögens — auf Schweizer Niveau.",
  },
];

const stats = [
  ["28", "Jahre Erfahrung"],
  ["410", "Verwaltete Objekte"],
  ["2'140", "Mieterbeziehungen"],
  ["100%", "Schweizer Werte"],
];

function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Horizontal showcase
      const track = document.querySelector<HTMLElement>("[data-showcase-track]");
      const wrap = showcaseRef.current;
      if (track && wrap) {
        const distance = () => track.scrollWidth - window.innerWidth + 64;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* HERO */}
      <section ref={ref} className="relative min-h-[100svh] flex items-end overflow-hidden bg-[#05060f]">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <HeroCanvas />
        </motion.div>

        {/* Aurora wash */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05060f]" />
          <div className="absolute -bottom-20 left-0 right-0 h-64 bg-gradient-to-t from-[#05060f] to-transparent" />
        </div>

        <motion.div
          style={{ y, opacity }}
          className="relative z-10 max-w-[1600px] mx-auto w-full px-6 md:px-8 lg:px-16 pb-20 lg:pb-36"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Eyebrow>Seit 1997 — Zürich</Eyebrow>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 80, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mt-8 font-serif text-balance text-glow"
            style={{ fontSize: "clamp(3.5rem, 8vw, 7.5rem)", lineHeight: 0.95 }}
          >
            <span className="text-white">Diskrete Verwaltung</span>
            <br />
            <span className="italic text-gradient">Schweizer Präzision.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-10 max-w-xl text-white/65 text-[15px] leading-relaxed"
          >
            LIVYA Immobilienverwaltung steht für ruhige Kompetenz, technologische
            Klarheit und ein menschliches Mass — über Generationen hinweg.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12 flex flex-wrap gap-5"
          >
            <MagneticButton to="/objekte">Objekte entdecken</MagneticButton>
            <MagneticButton to="/kontakt" variant="outline">
              Kontakt aufnehmen
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{ delay: 1.6, duration: 2.4, repeat: Infinity }}
          className="absolute bottom-8 right-6 lg:right-16 z-10 text-[10px] uppercase tracking-widest-xl text-white/40"
        >
          ↓ Scroll
        </motion.div>
      </section>

      {/* INTRO */}
      <Section alt>
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="aurora" />
        </div>
        <div className="grid lg:grid-cols-12 gap-12 relative">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Manifest</Eyebrow>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <h2
                className="font-serif text-balance text-white"
                style={{ fontSize: "clamp(2rem, 4.5vw, 4.25rem)", lineHeight: 1.05 }}
              >
                Eine Immobilie ist mehr als ein Gebäude — sie ist ein{" "}
                <span className="italic text-gradient">Versprechen auf Zeit.</span>{" "}
                Wir verwalten sie mit Geduld, Genauigkeit und einem Sinn für das
                Wesentliche.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10">
                <Link
                  to="/ueber-uns"
                  className="magnetic-link inline-flex items-center gap-2 text-[12px] uppercase tracking-widest-xl text-white/90"
                >
                  Über LIVYA <ArrowRight className="w-4 h-4" strokeWidth={1.25} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* SERVICES — floating glass cards */}
      <Section>
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="aurora" />
        </div>
        <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <Reveal>
            <div>
              <Eyebrow>Leistungen</Eyebrow>
              <h2
                className="mt-6 font-serif text-white"
                style={{ fontSize: "clamp(2rem, 4vw, 3.75rem)", lineHeight: 1.05 }}
              >
                Vier Disziplinen.
                <br />
                <span className="italic text-gradient">Ein Standard.</span>
              </h2>
            </div>
          </Reveal>
        </div>

        <Stagger className="relative grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((s) => (
            <motion.article
              key={s.title}
              variants={itemVariants}
              className="group"
            >
              <TiltCard className="glass gradient-border p-10 lg:p-14 h-full overflow-hidden">
                <div className="relative">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7c5cff]/40 to-[#5ce7ff]/30 blur-xl group-hover:opacity-100 opacity-70 transition-opacity" />
                    <s.icon className="relative w-9 h-9 text-white" strokeWidth={1.1} />
                  </div>
                  <h3 className="mt-10 font-serif text-3xl lg:text-4xl text-white">{s.title}</h3>
                  <p className="mt-4 text-white/60 max-w-md leading-relaxed">{s.body}</p>
                  <div className="mt-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-widest-xl text-white/80">
                    Mehr erfahren
                    <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5" strokeWidth={1.25} />
                  </div>
                </div>
              </TiltCard>
            </motion.article>
          ))}
        </Stagger>
      </Section>

      {/* STATS */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5ce7ff]/40 to-transparent" />
        <div className="absolute inset-0 opacity-30">
          <div className="aurora" />
        </div>
        <div className="relative max-w-[1600px] mx-auto px-6 md:px-8 lg:px-16 py-16 lg:py-24">
          <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(([n, l]) => (
              <motion.div
                key={l}
                variants={itemVariants}
                className="glass p-8 lg:p-10 gradient-border"
              >
                <div className="font-serif text-5xl lg:text-6xl text-gradient">{n}</div>
                <div className="mt-3 text-[11px] uppercase tracking-widest-xl text-white/55">{l}</div>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* SHOWCASE — horizontal scroll */}
      <section ref={showcaseRef} className="relative bg-[#05060f] overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-16 pt-24 lg:pt-32">
          <Reveal>
            <Eyebrow>Portfolio</Eyebrow>
            <h2
              className="mt-6 font-serif text-white"
              style={{ fontSize: "clamp(2rem, 4vw, 3.75rem)", lineHeight: 1.05 }}
            >
              Ausgewählte Residenzen —{" "}
              <span className="italic text-gradient">kuratiert.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 lg:mt-24 overflow-hidden pb-24 lg:pb-32">
          <div data-showcase-track className="flex gap-8 lg:gap-10 px-6 md:px-8 lg:px-16 will-change-transform">
            {[
              { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop", title: "Maison Limmat" },
              { img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&auto=format&fit=crop", title: "Villa Seefeld" },
              { img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80&auto=format&fit=crop", title: "Residenz Enge" },
              { img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80&auto=format&fit=crop", title: "Atelier Wollishofen" },
              { img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80&auto=format&fit=crop", title: "Haus Bellerive" },
            ].map((p) => (
              <div key={p.title} className="relative shrink-0 w-[78vw] md:w-[55vw] lg:w-[42vw] aspect-[4/5]">
                <div className="absolute inset-0 glass gradient-border overflow-hidden">
                  <motion.img
                    src={p.img}
                    alt={p.title}
                    initial={{ scale: 1.15 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                    <div className="text-[10px] uppercase tracking-widest-xl text-white/60">Zürich</div>
                    <div className="mt-2 font-serif text-3xl lg:text-4xl text-white">{p.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <Section alt>
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="aurora" />
        </div>
        <div className="relative text-center max-w-4xl mx-auto">
          <Reveal>
            <Eyebrow>Beginnen wir</Eyebrow>
            <h2
              className="mt-8 font-serif text-balance text-glow"
              style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)", lineHeight: 1.05 }}
            >
              <span className="text-white">Ein Gespräch ist</span>
              <br />
              <span className="italic text-gradient">der erste Schritt.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12 flex justify-center">
              <MagneticButton to="/kontakt">Kontakt aufnehmen</MagneticButton>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
