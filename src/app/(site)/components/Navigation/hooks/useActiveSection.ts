import { useEffect, useRef, useState } from "react";
import type { NavLink } from "../../../types/navigation";

/**
 * Hook para gerenciar o link ativo baseado em IntersectionObserver
 */
export function useActiveSection(links: NavLink[]) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef<string | null>(null);
  const debounceRef = useRef<number>(0);

  // Inicializar activeId baseado no hash ou primeiro link
  useEffect(() => {
    if (typeof window === "undefined" || links.length === 0) {
      setActiveId(null);
      activeIdRef.current = null;
      return;
    }

    const current = activeIdRef.current;
    if (current && links.some((link) => link.id === current)) {
      return;
    }

    const hash = window.location.hash.replace("#", "");
    const fallback = links.find((link) => link.id === hash)?.id ?? links[0].id;
    activeIdRef.current = fallback;
    setActiveId(fallback);
  }, [links]);

  // Observer para detectar seção ativa
  useEffect(() => {
    if (typeof window === "undefined" || links.length === 0) return;

    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length === 0) return;

        const nextId = visible[0].target.id;
        if (nextId !== activeIdRef.current) {
          if (debounceRef.current) {
            window.clearTimeout(debounceRef.current);
          }
          debounceRef.current = window.setTimeout(() => {
            activeIdRef.current = nextId;
            setActiveId(nextId);
          }, 80);
        }
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, [links]);

  // Detectar scroll no topo
  useEffect(() => {
    if (typeof window === "undefined" || links.length === 0) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY <= 20 && links[0]) {
            const topId = links[0].id;
            if (activeIdRef.current !== topId) {
              activeIdRef.current = topId;
              setActiveId(topId);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links]);

  return { activeId, activeIdRef };
}
