import { useEffect, useRef, useState } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea",
  "input[type='text']",
  "input[type='email']",
  "input[type='search']",
  "input[type='tel']",
  "input[type='url']",
  "input[type='number']",
  "select",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

/**
 * Hook para gerenciar o estado do drawer mobile
 */
export function useMobileDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const restoreOverflowRef = useRef<string | null>(null);

  // Fechar drawer ao redimensionar para desktop
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Gerenciar scroll lock e foco
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (!isOpen) {
      // Restaurar overflow
      if (restoreOverflowRef.current !== null) {
        document.body.style.overflow = restoreOverflowRef.current;
        restoreOverflowRef.current = null;
      } else {
        document.body.style.removeProperty("overflow");
      }

      // Restaurar foco
      const lastFocus = restoreFocusRef.current;
      if (lastFocus) {
        lastFocus.focus({ preventScroll: true });
        restoreFocusRef.current = null;
      }
      return;
    }

    // Lock scroll
    restoreOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    restoreFocusRef.current = document.activeElement as HTMLElement | null;

    const drawer = drawerRef.current;

    // Focar primeiro elemento
    const focusFirstElement = () => {
      if (!drawer) return;

      const focusable = Array.from(
        drawer.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((node) => !node.hasAttribute("disabled"));

      if (focusable.length > 0) {
        focusable[0].focus();
      } else {
        drawer.focus();
      }
    };

    // Gerenciar keyboard navigation
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      if (!drawer) return;

      const focusable = Array.from(
        drawer.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((node) => !node.hasAttribute("disabled"));

      if (focusable.length === 0) {
        event.preventDefault();
        drawer.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (!current || current === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (!current || current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    focusFirstElement();
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return {
    isOpen,
    setIsOpen,
    drawerRef,
    toggleButtonRef,
  };
}
