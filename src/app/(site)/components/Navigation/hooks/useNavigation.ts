import { useCallback } from "react";
import type { NavLink } from "../../../types/navigation";

/**
 * Hook para gerenciar navegação entre seções
 */
export function useNavigation({
  offsetPx = 80,
  reduceMotion = false,
  onNavClick,
  setActiveId,
}: {
  offsetPx: number;
  reduceMotion: boolean;
  onNavClick?: (link: NavLink) => void;
  setActiveId: (id: string) => void;
}) {
  const scrollToLink = useCallback(
    (link: NavLink) => {
      if (typeof window === "undefined") return;

      const element = document.getElementById(link.id);
      if (!element) {
        onNavClick?.(link);
        if (link.href.startsWith("#")) {
          window.location.hash = link.href;
        }
        return;
      }

      const rect = element.getBoundingClientRect();
      const target = Math.max(window.scrollY + rect.top - offsetPx, 0);
      const behavior = reduceMotion ? "auto" : "smooth";

      window.scrollTo({ top: target, behavior });

      const focusElement = () => {
        element.focus({ preventScroll: true });
      };

      if (reduceMotion) {
        focusElement();
      } else {
        window.setTimeout(focusElement, 360);
      }

      if (typeof window.history.replaceState === "function") {
        window.history.replaceState(null, "", link.href);
      }

      setActiveId(link.id);
      onNavClick?.(link);
    },
    [offsetPx, onNavClick, reduceMotion, setActiveId]
  );

  return { scrollToLink };
}
