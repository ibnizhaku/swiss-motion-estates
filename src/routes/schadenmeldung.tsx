import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Eyebrow, Section } from "../components/site/SiteLayout";
import { Reveal } from "../components/site/Reveal";
import { MagneticButton } from "../components/site/MagneticButton";

export const Route = createFileRoute("/schadenmeldung")({ component: Schadenmeldung });

function Field({
  label, name, type = "text", textarea, required,
}: { label: string; name: string; type?: string; textarea?: boolean; required?: boolean }) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");
  const float = focused || val.length > 0;
  return (
    <label className="relative block border-b border-[#e8e8e6] focus-within:border-[#1a1a1a] transition-colors duration-500 pt-7 pb-3">
      <span
        className={`absolute left-0 text-[11px] uppercase tracking-widest-xl transition-all duration-500 ${
          float ? "top-0 text-[#9a9a9a]" : "top-7 text-[#5a5a5a]"
        }`}
      >
        {label} {required && "*"}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows={4}
          required={required}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="block w-full bg-transparent outline-none resize-none text-[#1a1a1a]"
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="block w-full bg-transparent outline-none text-[#1a1a1a]"
        />
      )}
    </label>
  );
}

function Schadenmeldung() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <Section>
        <Reveal><Eyebrow>Schadenmeldung</Eyebrow></Reveal>
        <Reveal delay={0.1}>
          <h1
            className="mt-8 font-serif text-balance max-w-5xl"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 0.98 }}
          >
            Ein Schaden —
            <br />
            <span className="italic text-[#5a5a5a]">eine klare Antwort.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-xl text-[#5a5a5a]">
            Bitte beschreiben Sie den Schaden möglichst präzise. Wir bestätigen
            den Eingang innerhalb eines Werktages.
          </p>
        </Reveal>
      </Section>

      <Section alt>
        <div className="max-w-3xl mx-auto">
          {sent ? (
            <Reveal>
              <div className="text-center py-20">
                <h2 className="font-serif text-4xl">Vielen Dank.</h2>
                <p className="mt-6 text-[#5a5a5a]">
                  Ihre Meldung ist eingegangen. Wir melden uns in Kürze.
                </p>
              </div>
            </Reveal>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="grid gap-2"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <Field label="Vorname" name="firstname" required />
                <Field label="Nachname" name="lastname" required />
                <Field label="E-Mail" name="email" type="email" required />
                <Field label="Telefon" name="phone" type="tel" />
                <Field label="Liegenschaft / Adresse" name="property" required />
                <Field label="Wohnungsnummer" name="unit" />
              </div>
              <div className="mt-4">
                <Field label="Beschreibung des Schadens" name="message" textarea required />
              </div>
              <div className="mt-12">
                <MagneticButton>Meldung senden</MagneticButton>
              </div>
            </form>
          )}
        </div>
      </Section>
    </>
  );
}
