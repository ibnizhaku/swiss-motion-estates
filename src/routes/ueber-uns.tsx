import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow, Section } from "../components/site/SiteLayout";
import { Reveal, Stagger, itemVariants } from "../components/site/Reveal";
import { motion } from "framer-motion";

export const Route = createFileRoute("/ueber-uns")({ component: UeberUns });

const principles = [
  ["Diskretion", "Wir handeln im Hintergrund — sichtbar nur in der Qualität des Ergebnisses."],
  ["Präzision", "Schweizer Handwerk in jedem Vertrag, jeder Abrechnung, jeder Antwort."],
  ["Beständigkeit", "Wir denken in Jahrzehnten, nicht in Quartalen."],
  ["Klarheit", "Transparente Kommunikation ohne Floskeln, ohne Umwege."],
];

const team = [
  ["Dr. A. Brunner", "Geschäftsleitung", "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80&auto=format&fit=crop"],
  ["M. Steiner", "Bewirtschaftung", "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&auto=format&fit=crop"],
  ["L. Caduff", "Stockwerkeigentum", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop"],
  ["S. Weber", "Vermietung", "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80&auto=format&fit=crop"],
];

function UeberUns() {
  return (
    <>
      <Section>
        <Reveal><Eyebrow>Über uns</Eyebrow></Reveal>
        <Reveal delay={0.1}>
          <h1
            className="mt-8 font-serif text-balance max-w-5xl"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 0.98 }}
          >
            Eine Verwaltung,
            <br />
            <span className="italic text-[#5a5a5a]">geprägt von Ruhe.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-12 max-w-2xl text-[#5a5a5a]">
            LIVYA wurde 1997 in Zürich gegründet — mit dem Anspruch, die
            Immobilienverwaltung von administrativer Routine zu einer
            kultivierten Disziplin zu erheben.
          </p>
        </Reveal>
      </Section>

      <Section alt>
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative aspect-[4/5] bg-[#1a1a1a] overflow-hidden">
                <motion.img
                  initial={{ scale: 1.15 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop"
                  alt="LIVYA office"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:pl-12">
            <Reveal><Eyebrow>Manifest</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2
                className="mt-6 font-serif"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
              >
                Vier Prinzipien.
              </h2>
            </Reveal>
            <Stagger className="mt-12 divide-y divide-[#e8e8e6] border-t border-b border-[#e8e8e6]">
              {principles.map(([t, b]) => (
                <motion.div key={t} variants={itemVariants} className="py-8 grid grid-cols-12 gap-6">
                  <div className="col-span-12 md:col-span-4 font-serif text-2xl">{t}</div>
                  <p className="col-span-12 md:col-span-8 text-[#5a5a5a]">{b}</p>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      <Section>
        <Reveal><Eyebrow>Team</Eyebrow></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            Menschen mit Mass.
          </h2>
        </Reveal>
        <Stagger className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#e8e8e6] border border-[#e8e8e6]">
          {team.map(([n, r, img]) => (
            <motion.div key={n} variants={itemVariants} className="bg-white p-10">
              <div className="aspect-[4/5] bg-[#f5f5f3] mb-8 overflow-hidden">
                <img src={img} alt={n} className="w-full h-full object-cover" />
              </div>
              <div className="font-serif text-2xl">{n}</div>
              <div className="mt-2 text-[11px] uppercase tracking-widest-xl text-[#9a9a9a]">{r}</div>
            </motion.div>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
