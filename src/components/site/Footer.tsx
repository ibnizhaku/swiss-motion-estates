import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-16 py-14 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="font-serif text-3xl lg:text-4xl leading-[1.1] text-balance">
              Diskrete Verwaltung. <span className="italic text-white/60">Schweizer Präzision.</span>
            </h2>
            <p className="mt-4 text-sm text-white/60 max-w-md">
              Seit über zwei Jahrzehnten betreuen wir Eigentümer und Mieter mit
              kompromissloser Sorgfalt im Herzen der Schweiz.
            </p>
          </div>

          <div className="lg:col-span-3 lg:col-start-7 grid gap-4 text-[12px] uppercase tracking-widest-xl">
            <div className="text-white/40 mb-2">Navigation</div>
            {[
              ["/", "Home"],
              ["/ueber-uns", "Über uns"],
              ["/eigentuemer", "Eigentümer"],
              ["/objekte", "Objekte"],
              ["/kontakt", "Kontakt"],
            ].map(([to, label]) => (
              <Link key={to} to={to as any} className="magnetic-link inline-block w-fit">
                {label}
              </Link>
            ))}
          </div>

          <div className="lg:col-span-3 grid gap-4 text-[12px] uppercase tracking-widest-xl">
            <div className="text-white/40 mb-2">Mieter</div>
            {[
              ["/schadenmeldung", "Schadenmeldung"],
              ["/mieter-dokumente", "Dokumente"],
              ["/notfall", "Notfall"],
              ["/impressum", "Impressum"],
              ["/datenschutz", "Datenschutz"],
            ].map(([to, label]) => (
              <Link key={to} to={to as any} className="magnetic-link inline-block w-fit">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-24 pt-10 border-t border-white/10 grid md:grid-cols-3 gap-6 text-[12px] uppercase tracking-widest-xl text-white/60">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 mt-0.5" strokeWidth={1.25} />
            Bahnhofstrasse 42, 8001 Zürich
          </div>
          <a href="mailto:info@livya.ch" className="flex items-start gap-3 magnetic-link w-fit">
            <Mail className="w-4 h-4 mt-0.5" strokeWidth={1.25} /> info@livya.ch
          </a>
          <a href="tel:+41441234567" className="flex items-start gap-3 magnetic-link w-fit">
            <Phone className="w-4 h-4 mt-0.5" strokeWidth={1.25} /> +41 44 123 45 67
          </a>
        </div>

        <div className="mt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="font-serif text-4xl">LIVYA</div>
          <div className="text-[11px] uppercase tracking-widest-xl text-white/40">
            © {new Date().getFullYear()} Livya Immobilienverwaltung GmbH
          </div>
        </div>
      </div>
    </footer>
  );
}
