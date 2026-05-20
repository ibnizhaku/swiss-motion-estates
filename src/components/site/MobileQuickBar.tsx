import { Link } from "@tanstack/react-router";
import { Building2, Mail, Phone } from "lucide-react";

export function MobileQuickBar() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#1a1a1a] text-white border-t border-white/10">
      <div className="grid grid-cols-3 text-[10px] uppercase tracking-widest-xl">
        <a href="tel:+41441234567" className="flex items-center justify-center gap-2 py-4 min-h-[56px]">
          <Phone className="w-4 h-4" strokeWidth={1.25} /> Call
        </a>
        <a href="mailto:info@livya.ch" className="flex items-center justify-center gap-2 py-4 border-x border-white/10 min-h-[56px]">
          <Mail className="w-4 h-4" strokeWidth={1.25} /> Mail
        </a>
        <Link to="/objekte" className="flex items-center justify-center gap-2 py-4 min-h-[56px]">
          <Building2 className="w-4 h-4" strokeWidth={1.25} /> Objekte
        </Link>
      </div>
    </div>
  );
}
