import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AlertCircle, Phone } from "lucide-react";
import { Eyebrow, Section } from "../components/site/SiteLayout";
import { Reveal, Stagger, itemVariants } from "../components/site/Reveal";

export const Route = createFileRoute("/notfall")({ component: Notfall });

const contacts = [
  ["Sanitär / Wasser", "+41 44 555 11 22", "24h"],
  ["Heizung", "+41 44 555 33 44", "24h"],
  ["Elektrizität", "+41 44 555 55 66", "24h"],
  ["Schlüsseldienst", "+41 44 555 77 88", "24h"],
];

function Notfall() {
  return (
    <>
      <Section dark>
        <Reveal>
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest-xl text-white/60">
            <AlertCircle className="w-4 h-4" strokeWidth={1.25} /> Notfall
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1
            className="mt-8 font-serif text-balance max-w-5xl text-white"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 0.98 }}
          >
            Im Ernstfall —
            <br />
            <span className="italic text-white/60">sofort erreichbar.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-xl text-white/60">
            Bei akuten Notfällen wenden Sie sich direkt an die unten aufgeführten
            Stellen. Für nicht dringliche Anliegen nutzen Sie bitte die
            Schadenmeldung.
          </p>
        </Reveal>
      </Section>

      <Section>
        <Stagger className="grid md:grid-cols-2 gap-px bg-[#e8e8e6] border border-[#e8e8e6]">
          {contacts.map(([t, n, h]) => (
            <motion.a
              href={`tel:${n.replace(/\s/g, "")}`}
              key={t}
              variants={itemVariants}
              className="group bg-white p-10 lg:p-14 flex items-start justify-between gap-6 hover:bg-[#1a1a1a] hover:text-white transition-colors duration-500"
            >
              <div>
                <div className="text-[11px] uppercase tracking-widest-xl text-[#9a9a9a] group-hover:text-white/60">{h}</div>
                <h3 className="mt-4 font-serif text-3xl">{t}</h3>
                <div className="mt-6 text-xl">{n}</div>
              </div>
              <Phone className="w-6 h-6 shrink-0" strokeWidth={1} />
            </motion.a>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
