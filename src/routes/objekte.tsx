import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Eyebrow, Section } from "../components/site/SiteLayout";
import { Reveal, Stagger, itemVariants } from "../components/site/Reveal";

export const Route = createFileRoute("/objekte")({ component: Objekte });

const objects = [
  {
    name: "Maison Limmat",
    loc: "Zürich",
    type: "Residenz · 8 Einheiten",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80&auto=format&fit=crop",
  },
  {
    name: "Villa Bellerive",
    loc: "Genf",
    type: "Villa · Eigentum",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80&auto=format&fit=crop",
  },
  {
    name: "Atelier Hardturm",
    loc: "Zürich West",
    type: "Loft · 12 Einheiten",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80&auto=format&fit=crop",
  },
  {
    name: "Residenz Höhe",
    loc: "Zug",
    type: "Apartments · 24 Einheiten",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80&auto=format&fit=crop",
  },
];

function Objekte() {
  return (
    <>
      <Section>
        <Reveal><Eyebrow>Objekte</Eyebrow></Reveal>
        <Reveal delay={0.1}>
          <h1
            className="mt-8 font-serif text-balance max-w-5xl"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 0.98 }}
          >
            Ein kuratiertes
            <br />
            <span className="italic text-[#5a5a5a]">Portfolio.</span>
          </h1>
        </Reveal>
      </Section>

      <Section alt>
        <Stagger className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {objects.map((o) => (
            <motion.a
              key={o.name}
              variants={itemVariants}
              href="#"
              className="group"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#1a1a1a]">
                <motion.img
                  src={o.img}
                  alt={o.name}
                  className="w-full h-full object-cover grayscale"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="mt-8 flex items-end justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest-xl text-[#9a9a9a]">
                    <MapPin className="w-3 h-3" strokeWidth={1.25} /> {o.loc}
                  </div>
                  <h3 className="mt-3 font-serif text-3xl lg:text-4xl">{o.name}</h3>
                  <div className="mt-2 text-[#5a5a5a] text-sm">{o.type}</div>
                </div>
                <ArrowRight
                  className="w-5 h-5 shrink-0 transition-transform duration-500 group-hover:translate-x-2"
                  strokeWidth={1.25}
                />
              </div>
            </motion.a>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
