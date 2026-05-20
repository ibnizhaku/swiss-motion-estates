import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7c5cff] to-transparent" />
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="aurora" />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-8 lg:px-16 py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="font-serif text-4xl lg:text-5xl leading-[1.05] text-balance">
              Diskrete Verwaltung.{" "}
              <span className="italic text-gradient">Schweizer Präzision.</span>
            </h2>
            <p className="mt-6 text-[15px] text-white/55 max-w-md leading-relaxed">
              Seit über zwei Jahrzehnten betreuen wir Eigentümer und Mieter mit
              kompromissloser Sorgfalt im Herzen der Schweiz.
            </p>
          </div>

          <div className="lg:col-span-3 lg:col-start-7 grid gap-3 text-[12px] uppercase tracking-widest-xl">
            <div className="text-white/35 mb-2">Navigation</div>
            {[
              ["/", "Home"],
              ["/ueber-uns", "Über uns"],
              ["/eigentuemer", "Eigentümer"],
              ["/objekte", "Objekte"],
              ["/kontakt", "Kontakt"],
            ].map(([to, label]) => (
              <Link key={to} to={to as any} className="magnetic-link inline-block w-fit text-white/80 hover:text-white">
                {label}
              </Link>
            ))}
          </div>

          <div className="lg:col-span-3 grid gap-3 text-[12px] uppercase tracking-widest-xl">
            <div className="text-white/35 mb-2">Mieter</div>
            {[
              ["/schadenmeldung", "Schadenmeldung"],
              ["/mieter-dokumente", "Dokumente"],
              ["/notfall", "Notfall"],
              ["/impressum", "Impressum"],
              ["/datenschutz", "Datenschutz"],
            ].map(([to, label]) => (
              <Link key={to} to={to as any} className="magnetic-link inline-block w-fit text-white/80 hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 grid md:grid-cols-3 gap-5 text-[12px] uppercase tracking-widest-xl text-white/60">
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

        <div className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="font-serif text-3xl text-gradient">LIVYA</div>
          <div className="text-[11px] uppercase tracking-widest-xl text-white/40">
            © {new Date().getFullYear()} Livya Immobilienverwaltung GmbH
          </div>
        </div>
      </div>
    </footer>
  );
}
