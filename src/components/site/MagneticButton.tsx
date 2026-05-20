import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, type ReactNode } from "react";

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
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const base =
    "group relative inline-flex items-center gap-3 px-8 py-4 text-[11px] uppercase tracking-widest-xl font-medium transition-colors duration-500 overflow-hidden streak";
  const styles =
    variant === "solid"
      ? "text-white border border-white/20 bg-white/5 backdrop-blur-md pulse-glow"
      : variant === "outline"
      ? "text-white border border-white/30 hover:bg-white/10 backdrop-blur-md"
      : "text-white/80 hover:text-white";

  const content = (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block transition-transform duration-500 ease-out"
      style={{ willChange: "transform" }}
    >
      <motion.span
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className={`${base} ${styles} ${className}`}
      >
        <span className="relative z-10">{children}</span>
        {arrow && (
          <ArrowRight
            className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5"
            strokeWidth={1.5}
          />
        )}
      </motion.span>
    </span>
  );

  if (to) return <Link to={to as any} onClick={onClick}>{content}</Link>;
  if (href) return <a href={href} onClick={onClick}>{content}</a>;
  return <button onClick={onClick}>{content}</button>;
}
