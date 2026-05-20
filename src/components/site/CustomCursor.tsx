import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window || window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" });

    let visible = false;
    const move = (e: MouseEvent) => {
      if (!visible) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
        visible = true;
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const leave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
      visible = false;
    };

    const hoverSelector =
      'a, button, [role="button"], input, textarea, label, .magnetic-link, [data-cursor]';
    const viewSelector = '[data-cursor="view"], .property-card, .team-card, .office-image-wrapper';

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest(hoverSelector);
      if (!t) return;
      const isView = !!(t as HTMLElement).closest(viewSelector);
      if (isView) {
        gsap.to(ring, {
          width: 56,
          height: 56,
          borderColor: "#1a1a1a",
          borderWidth: 1,
          duration: 0.3,
          ease: "power3.out",
        });
        ring.setAttribute("data-label", "VIEW");
      } else {
        gsap.to([dot, ring], { scale: 1.4, duration: 0.25, ease: "power3.out" });
        ring.style.mixBlendMode = "difference";
      }
    };

    const onOut = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest(hoverSelector);
      if (!t) return;
      gsap.to(ring, {
        width: 28,
        height: 28,
        borderColor: "rgba(26,26,26,0.25)",
        borderWidth: 1,
        scale: 1,
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.25 });
      ring.removeAttribute("data-label");
      ring.style.mixBlendMode = "";
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="custom-cursor-ring pointer-events-none fixed top-0 left-0 z-[9998] rounded-full"
        style={{
          width: 28,
          height: 28,
          border: "1px solid rgba(26,26,26,0.25)",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{ width: 6, height: 6, background: "#1a1a1a" }}
      />
    </>
  );
}
