import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Eyebrow, Section } from "../components/site/SiteLayout";
import { Reveal } from "../components/site/Reveal";
import { MagneticButton } from "../components/site/MagneticButton";

export const Route = createFileRoute("/kontakt")({ component: Kontakt });

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
          rows={4}
          name={name}
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

function Kontakt() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <Section>
        <Reveal><Eyebrow>Kontakt</Eyebrow></Reveal>
        <Reveal delay={0.1}>
          <h1
            className="mt-8 font-serif text-balance max-w-5xl"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 0.98 }}
          >
            Beginnen wir
            <br />
            <span className="italic text-[#5a5a5a]">ein Gespräch.</span>
          </h1>
        </Reveal>
      </Section>

      <Section alt>
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-12">
            <div>
              <Eyebrow>Adresse</Eyebrow>
              <div className="mt-4 font-serif text-2xl flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1.5" strokeWidth={1.25} />
                Bahnhofstrasse 42<br />8001 Zürich
              </div>
            </div>
            <div>
              <Eyebrow>Erreichbar</Eyebrow>
              <a href="mailto:info@livya.ch" className="mt-4 font-serif text-2xl flex items-center gap-3 magnetic-link w-fit">
                <Mail className="w-5 h-5" strokeWidth={1.25} /> info@livya.ch
              </a>
              <a href="tel:+41441234567" className="mt-3 font-serif text-2xl flex items-center gap-3 magnetic-link w-fit">
                <Phone className="w-5 h-5" strokeWidth={1.25} /> +41 44 123 45 67
              </a>
            </div>
            <div>
              <Eyebrow>Öffnungszeiten</Eyebrow>
              <div className="mt-4 font-serif text-xl flex items-start gap-3">
                <Clock className="w-5 h-5 mt-1" strokeWidth={1.25} />
                <div>
                  Mo – Fr · 08:30 – 12:00<br />
                  Mo – Do · 13:30 – 17:00
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {sent ? (
              <div className="py-20 text-center">
                <h2 className="font-serif text-4xl">Vielen Dank.</h2>
                <p className="mt-6 text-[#5a5a5a]">Wir melden uns in Kürze persönlich bei Ihnen.</p>
              </div>
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
                </div>
                <div className="mt-4">
                  <Field label="Ihre Nachricht" name="message" textarea required />
                </div>
                <div className="mt-12">
                  <MagneticButton>Senden</MagneticButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
