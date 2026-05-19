import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow, Section } from "../components/site/SiteLayout";
import { Reveal } from "../components/site/Reveal";

export const Route = createFileRoute("/datenschutz")({ component: Datenschutz });

function Datenschutz() {
  return (
    <Section>
      <Reveal><Eyebrow>Rechtliches</Eyebrow></Reveal>
      <Reveal delay={0.1}>
        <h1 className="mt-8 font-serif" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: 1 }}>
          Datenschutz
        </h1>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="mt-16 max-w-3xl text-[#5a5a5a] space-y-8">
          <p>
            Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen.
            Wir verarbeiten Ihre Daten ausschliesslich auf Grundlage der
            gesetzlichen Bestimmungen (DSG, DSGVO).
          </p>
          <div>
            <h2 className="font-serif text-2xl text-[#1a1a1a]">Erhebung von Daten</h2>
            <p className="mt-3">
              Wir erheben Daten nur dann, wenn Sie uns diese im Rahmen einer
              Anfrage oder Mandatierung freiwillig übermitteln.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-[#1a1a1a]">Verwendung</h2>
            <p className="mt-3">
              Ihre Daten werden ausschliesslich zur Bearbeitung Ihres Anliegens
              verwendet und nicht an Dritte weitergegeben.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-[#1a1a1a]">Ihre Rechte</h2>
            <p className="mt-3">
              Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung
              oder Einschränkung Ihrer gespeicherten Daten.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
