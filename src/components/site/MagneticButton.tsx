import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
};

export function MagneticButton({
  to,
  href,
  children,
  variant = "solid",
  arrow = true,
  className = "",
  onClick,
}: Props) {
  const base =
    "group relative inline-flex items-center gap-3 px-7 py-4 text-[11px] uppercase tracking-widest-xl font-medium transition-colors duration-500";
  const styles =
    variant === "solid"
      ? "bg-[#1a1a1a] text-white hover:bg-white hover:text-[#1a1a1a] border border-[#1a1a1a]"
      : variant === "outline"
      ? "border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"
      : "text-[#1a1a1a] hover:opacity-60";

  const content = (
    <motion.span
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`${base} ${styles} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      {arrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5" strokeWidth={1.25} />
      )}
    </motion.span>
  );

  if (to) return <Link to={to as any} onClick={onClick}>{content}</Link>;
  if (href) return <a href={href} onClick={onClick}>{content}</a>;
  return <button onClick={onClick}>{content}</button>;
}
