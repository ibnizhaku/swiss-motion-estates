import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Splits an element's text into word spans (one-shot).
 */
function splitWords(el: HTMLElement) {
  if (el.dataset.split === "1") return Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
  const text = el.textContent ?? "";
  el.textContent = "";
  const words = text.split(/(\s+)/);
  const spans: HTMLElement[] = [];
  for (const w of words) {
    if (/^\s+$/.test(w)) {
      el.appendChild(document.createTextNode(w));
      continue;
    }
    const outer = document.createElement("span");
    outer.style.display = "inline-block";
    outer.style.overflow = "hidden";
    outer.style.verticalAlign = "top";
    const inner = document.createElement("span");
    inner.dataset.word = "1";
    inner.style.display = "inline-block";
    inner.style.willChange = "transform,opacity";
    inner.textContent = w;
    outer.appendChild(inner);
    el.appendChild(outer);
    spans.push(inner);
  }
  el.dataset.split = "1";
  return spans;
}

function animateCountUp(el: HTMLElement) {
  if (el.dataset.counted === "1") return;
  const raw = (el.textContent || "").trim();
  const match = raw.match(/([\d'’.,\s]+)/);
  if (!match) return;
  const numStr = match[1].replace(/[^\d]/g, "");
  const target = parseInt(numStr, 10);
  if (!Number.isFinite(target) || target <= 0) return;
  const suffix = raw.slice(match.index! + match[1].length);
  const prefix = raw.slice(0, match.index!);
  el.dataset.counted = "1";
  const state = { val: 0 };
  gsap.to(state, {
    val: target,
    duration: 2,
    ease: "power2.out",
    onUpdate: () => {
      el.textContent = `${prefix}${Math.round(state.val).toLocaleString("de-CH")}${suffix}`;
    },
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      once: true,
    },
  });
}

export function ScrollAnimations() {
  const { location } = useRouterState();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const isMobile = window.innerWidth < 768;
    const stagger = isMobile ? 0.06 : 0.09;
    const dur = isMobile ? 0.6 : 0.85;

    const ctx = gsap.context(() => {
      // 1) Word-reveal for headings
      const headings = gsap.utils.toArray<HTMLElement>("h1, h2");
      headings.forEach((h) => {
        const words = splitWords(h);
        if (!words.length) return;
        gsap.from(words, {
          opacity: 0,
          yPercent: 110,
          rotateX: -40,
          stagger,
          duration: dur,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: h,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      // 2) Paragraphs, eyebrows, links, list items — fade up
      const fades = gsap.utils.toArray<HTMLElement>(
        "section p, section li, section blockquote, .eyebrow, [data-reveal]"
      );
      fades.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: dur * 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });

      // 3) Cards / grid children — staggered rise
      const grids = gsap.utils.toArray<HTMLElement>(
        "section .grid, section [data-stagger]"
      );
      grids.forEach((grid) => {
        const children = Array.from(grid.children) as HTMLElement[];
        if (children.length < 2) return;
        gsap.from(children, {
          opacity: 0,
          y: 60,
          stagger,
          duration: dur,
          ease: "power2.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });

      // 4) Images — parallax + clip reveal (skip on mobile)
      if (!isMobile) {
        const imgs = gsap.utils.toArray<HTMLElement>("section img");
        imgs.forEach((img) => {
          gsap.from(img, {
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }

      // 5) Count-up stats — any element with data-count or numbers in stat blocks
      const stats = gsap.utils.toArray<HTMLElement>("[data-count]");
      stats.forEach(animateCountUp);

      // 6) Buttons / CTAs — subtle entrance
      const ctas = gsap.utils.toArray<HTMLElement>("a[class*='border'], button[class*='border']");
      ctas.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 16,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    // Refresh after layout settles
    const t = setTimeout(() => ScrollTrigger.refresh(), 60);

    return () => {
      clearTimeout(t);
      ctx.revert();
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, [location.pathname]);

  return null;
}
