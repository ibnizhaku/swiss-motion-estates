import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow, Section } from "../components/site/SiteLayout";
import { Reveal, Stagger, itemVariants } from "../components/site/Reveal";
import { MagneticButton } from "../components/site/MagneticButton";
import { motion } from "framer-motion";

export const Route = createFileRoute("/eigentuemer")({ component: Eigentuemer });

const services = [
  ["01", "Erstvermietung", "Strategische Positionierung und Markteinführung neuer Liegenschaften."],
  ["02", "Bewirtschaftung", "Tägliche Betreuung, Mietzinsinkasso, Kommunikation mit Mietern."],
  ["03", "Rechnungswesen", "Jahresabrechnung, Heiz- und Nebenkosten, Reporting in Schweizer Standards."],
  ["04", "Renovationen", "Koordination von Sanierungen mit kuratiertem Handwerkernetz."],
  ["05", "Stockwerkeigentum", "Versammlungen, Protokolle, Reservefondsverwaltung."],
  ["06", "Beratung", "Strategische Begleitung zum langfristigen Werterhalt."],
];

function Eigentuemer() {
  return (
    <>
      <Section>
        <Reveal><Eyebrow>Eigentümer</Eyebrow></Reveal>
        <Reveal delay={0.1}>
          <h1
            className="mt-8 font-serif text-balance max-w-5xl"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 0.98 }}
          >
            Ihre Liegenschaft —
            <br />
            <span className="italic text-[#5a5a5a]">in vertrauten Händen.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-12 max-w-2xl text-[#5a5a5a]">
            Wir verstehen Eigentum als Verantwortung. Unsere Eigentümerbetreuung
            verbindet wirtschaftliche Klarheit mit menschlicher Sorgfalt.
          </p>
        </Reveal>
      </Section>

      <Section alt>
        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e8e8e6] border border-[#e8e8e6]">
          {services.map(([n, t, b]) => (
            <motion.article
              key={n}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-white p-10 lg:p-14"
            >
              <div className="text-[11px] uppercase tracking-widest-xl text-[#9a9a9a]">{n}</div>
              <h3 className="mt-8 font-serif text-3xl">{t}</h3>
              <p className="mt-4 text-[#5a5a5a]">{b}</p>
            </motion.article>
          ))}
        </Stagger>
      </Section>

      <Section>
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <Reveal><Eyebrow>Mandat</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2
                className="mt-6 font-serif text-balance"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05 }}
              >
                Übergeben Sie Ihre Liegenschaft mit Vertrauen — wir betreuen sie wie
                <span className="italic text-[#5a5a5a]"> unsere eigene.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <Reveal delay={0.2}>
              <MagneticButton to="/kontakt">Mandat anfragen</MagneticButton>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
