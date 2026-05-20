import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Building2, FileCheck, Heart, Shield } from "lucide-react";
import { Eyebrow, Section } from "../components/site/SiteLayout";
import { Reveal, Stagger, itemVariants } from "../components/site/Reveal";
import { MagneticButton } from "../components/site/MagneticButton";
import { HeroCanvas } from "../components/site/HeroCanvas";

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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* HERO */}
      <section ref={ref} className="relative min-h-[100svh] flex items-end overflow-hidden">
        <HeroCanvas />
        <motion.div
          style={{ y, opacity }}
          className="relative z-10 max-w-[1600px] mx-auto w-full px-6 md:px-8 lg:px-16 pb-16 lg:pb-32"
        >
          <Eyebrow>Seit 1997 — Zürich</Eyebrow>
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mt-8 font-serif text-balance"
            style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)", lineHeight: 0.95 }}
          >
            Diskrete Verwaltung
            <br />
            <span className="italic text-[#5a5a5a]">Schweizer Präzision.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-10 max-w-xl text-[#5a5a5a]"
          >
            LIVYA Immobilienverwaltung steht für ruhige Kompetenz, technologische
            Klarheit und ein menschliches Mass — über Generationen hinweg.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <MagneticButton to="/objekte">Objekte entdecken</MagneticButton>
            <MagneticButton to="/kontakt" variant="outline">
              Kontakt aufnehmen
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-6 right-6 lg:right-16 z-10 text-[10px] uppercase tracking-widest-xl text-[#9a9a9a]"
        >
          Scroll
        </motion.div>
      </section>

      {/* INTRO */}
      <Section alt>
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Manifest</Eyebrow>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <h2
                className="font-serif text-balance"
                style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1.05 }}
              >
                Eine Immobilie ist mehr als ein Gebäude — sie ist ein
                <span className="italic text-[#5a5a5a]"> Versprechen auf Zeit.</span>{" "}
                Wir verwalten sie mit Geduld, Genauigkeit und einem Sinn für das
                Wesentliche.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10">
                <Link
                  to="/ueber-uns"
                  className="magnetic-link inline-flex items-center gap-2 text-[12px] uppercase tracking-widest-xl"
                >
                  Über LIVYA <ArrowRight className="w-4 h-4" strokeWidth={1.25} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* SERVICES */}
      <Section>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <Reveal>
            <div>
              <Eyebrow>Leistungen</Eyebrow>
              <h2
                className="mt-6 font-serif"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05 }}
              >
                Vier Disziplinen.
                <br />
                <span className="italic text-[#5a5a5a]">Ein Standard.</span>
              </h2>
            </div>
          </Reveal>
        </div>
        <Stagger className="grid md:grid-cols-2 gap-px bg-[#e8e8e6] border border-[#e8e8e6]">
          {services.map((s) => (
            <motion.article
              key={s.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white p-10 lg:p-16 group"
            >
              <s.icon className="w-8 h-8 text-[#1a1a1a]" strokeWidth={1} />
              <h3 className="mt-10 font-serif text-3xl lg:text-4xl">{s.title}</h3>
              <p className="mt-4 text-[#5a5a5a] max-w-md">{s.body}</p>
              <div className="mt-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-widest-xl">
                Mehr erfahren
                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5" strokeWidth={1.25} />
              </div>
            </motion.article>
          ))}
        </Stagger>
      </Section>

      {/* STATS — scroll storytelling */}
      <section className="bg-[#1a1a1a] text-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-16 py-12 lg:py-20">
          <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {stats.map(([n, l]) => (
              <motion.div
                key={l}
                variants={itemVariants}
                className="bg-[#1a1a1a] px-6 py-8 lg:py-12"
              >
                <div className="font-serif text-4xl lg:text-5xl">{n}</div>
                <div className="mt-3 text-[11px] uppercase tracking-widest-xl text-white/60">{l}</div>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FEATURED OBJECT */}
      <Section alt>
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden bg-[#1a1a1a]">
                <motion.img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80&auto=format&fit=crop"
                  alt="Featured residence"
                  initial={{ scale: 1.15 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Featured</Eyebrow>
              <h3
                className="mt-6 font-serif"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
              >
                Maison Limmat — Zürich
              </h3>
              <p className="mt-6 text-[#5a5a5a] max-w-md">
                Eine ruhige Residenz am Wasser. Acht Einheiten, archi­tek­tonisch
                kuratiert, langfristig vermietet — verwaltet mit der LIVYA-Methode.
              </p>
              <div className="mt-10">
                <MagneticButton to="/objekte">Alle Objekte</MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center max-w-4xl mx-auto">
          <Reveal>
            <Eyebrow>Beginnen wir</Eyebrow>
            <h2
              className="mt-8 font-serif text-balance"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05 }}
            >
              Ein Gespräch ist
              <br />
              <span className="italic text-[#5a5a5a]">der erste Schritt.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12 flex justify-center">
              <MagneticButton to="/kontakt">Kontakt</MagneticButton>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
