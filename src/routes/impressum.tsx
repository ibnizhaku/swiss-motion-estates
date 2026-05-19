import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow, Section } from "../components/site/SiteLayout";
import { Reveal } from "../components/site/Reveal";

export const Route = createFileRoute("/impressum")({ component: Impressum });

function Impressum() {
  return (
    <Section>
      <Reveal><Eyebrow>Rechtliches</Eyebrow></Reveal>
      <Reveal delay={0.1}>
        <h1 className="mt-8 font-serif" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: 1 }}>
          Impressum
        </h1>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="mt-16 grid lg:grid-cols-2 gap-12 max-w-5xl text-[#5a5a5a]">
          <div>
            <div className="text-[11px] uppercase tracking-widest-xl text-[#9a9a9a]">Anbieter</div>
            <div className="mt-4 font-serif text-2xl text-[#1a1a1a]">
              LIVYA Immobilienverwaltung GmbH
            </div>
            <p className="mt-4">
              Bahnhofstrasse 42<br />8001 Zürich<br />Schweiz
            </p>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-widest-xl text-[#9a9a9a]">Kontakt</div>
            <p className="mt-4">
              info@livya.ch<br />+41 44 123 45 67
            </p>
            <div className="mt-8 text-[11px] uppercase tracking-widest-xl text-[#9a9a9a]">Handelsregister</div>
            <p className="mt-4">CHE-123.456.789</p>
          </div>
          <div className="lg:col-span-2">
            <div className="text-[11px] uppercase tracking-widest-xl text-[#9a9a9a]">Haftungsausschluss</div>
            <p className="mt-4">
              Alle Inhalte dieser Website wurden mit grösstmöglicher Sorgfalt
              erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der
              Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
