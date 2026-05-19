import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FileDown } from "lucide-react";
import { Eyebrow, Section } from "../components/site/SiteLayout";
import { Reveal, Stagger, itemVariants } from "../components/site/Reveal";

export const Route = createFileRoute("/mieter-dokumente")({ component: MieterDokumente });

const docs = [
  ["Mietvertrag — Vorlage", "PDF · 240 KB"],
  ["Hausordnung", "PDF · 180 KB"],
  ["Anleitung Wohnungsabnahme", "PDF · 320 KB"],
  ["Nebenkostenabrechnung — Erklärung", "PDF · 210 KB"],
  ["Untermiete — Formular", "PDF · 150 KB"],
  ["Kündigungsformular", "PDF · 140 KB"],
];

function MieterDokumente() {
  return (
    <>
      <Section>
        <Reveal><Eyebrow>Mieter · Dokumente</Eyebrow></Reveal>
        <Reveal delay={0.1}>
          <h1
            className="mt-8 font-serif text-balance max-w-5xl"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 0.98 }}
          >
            Alles, was Sie brauchen —
            <br />
            <span className="italic text-[#5a5a5a]">an einem Ort.</span>
          </h1>
        </Reveal>
      </Section>

      <Section alt>
        <Stagger className="border-t border-[#e8e8e6]">
          {docs.map(([t, m]) => (
            <motion.a
              key={t}
              variants={itemVariants}
              href="#"
              className="group grid grid-cols-12 gap-6 items-center py-8 border-b border-[#e8e8e6] hover:bg-white transition-colors duration-500 px-2"
            >
              <FileDown className="col-span-1 w-5 h-5" strokeWidth={1.25} />
              <div className="col-span-7 font-serif text-2xl lg:text-3xl">{t}</div>
              <div className="col-span-3 text-[11px] uppercase tracking-widest-xl text-[#9a9a9a]">{m}</div>
              <div className="col-span-1 text-[11px] uppercase tracking-widest-xl text-right opacity-0 group-hover:opacity-100 transition-opacity">
                Download
              </div>
            </motion.a>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
