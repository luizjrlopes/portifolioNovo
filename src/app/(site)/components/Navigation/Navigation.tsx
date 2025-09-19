"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent } from "react";
import type { NavigationProps, NavLink } from "../../types/navigation";
import { FEATURES } from "../../config/features";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { Actions, Brand, Header, HeaderCta, Inner } from "./styles";

const DRAWER_ID = "nav-drawer";
const SCROLL_THRESHOLD = 20;
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

export default function Navigation({
  links,
  offsetPx = 80,
  translucentOverHero = true,
  onNavClick,
}: NavigationProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const activeIdRef = useRef<string | null>(null);
  const debounceRef = useRef<number>(0);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const restoreOverflowRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let ticking = false;

    const run = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
      if (window.scrollY <= SCROLL_THRESHOLD && links[0]) {
        const topId = links[0].id;
        if (activeIdRef.current !== topId) {
          activeIdRef.current = topId;
          setActiveId(topId);
        }
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          run();
          ticking = false;
        });
        ticking = true;
      }
    };

    run();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [links]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (links.length === 0) {
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

  useEffect(() => {
    if (typeof window === "undefined" || links.length === 0) {
      return;
    }

    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length === 0) {
          return;
        }

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

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (!isOpen) {
      if (restoreOverflowRef.current !== null) {
        document.body.style.overflow = restoreOverflowRef.current;
        restoreOverflowRef.current = null;
      } else {
        document.body.style.removeProperty("overflow");
      }

      const lastFocus = restoreFocusRef.current;
      if (lastFocus) {
        lastFocus.focus({ preventScroll: true });
        restoreFocusRef.current = null;
      }
      return;
    }

    restoreOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    restoreFocusRef.current = document.activeElement as HTMLElement | null;

    const drawer = drawerRef.current;
    const focusFirstElement = () => {
      if (!drawer) {
        return;
      }
      const focusable = Array.from(
        drawer.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((node) => !node.hasAttribute("disabled"));

      if (focusable.length > 0) {
        focusable[0].focus();
      } else {
        drawer.focus();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      if (!drawer) {
        return;
      }

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

  const closeDrawer = useCallback(() => setIsOpen(false), []);
  const toggleDrawer = useCallback(() => setIsOpen((open) => !open), []);

  const scrollToLink = useCallback(
    (link: NavLink) => {
      if (typeof window === "undefined") {
        return;
      }

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

      activeIdRef.current = link.id;
      setActiveId(link.id);
      onNavClick?.(link);
    },
    [offsetPx, onNavClick, reduceMotion]
  );

  const handleDesktopNavigate = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, link: NavLink) => {
      event.preventDefault();
      scrollToLink(link);
    },
    [scrollToLink]
  );

  const handleMobileNavigate = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, link: NavLink) => {
      event.preventDefault();
      scrollToLink(link);
      setIsOpen(false);
    },
    [scrollToLink]
  );

  const editorCta = useMemo(() => {
    if (!FEATURES.enableEditor) {
      return null;
    }

    return <HeaderCta href="#/editor">Abrir editor</HeaderCta>;
  }, []);

  const mobileCta = useMemo(() => {
    if (!FEATURES.enableEditor) {
      return null;
    }

    return (
      <HeaderCta href="#/editor" $fullWidth>
        Abrir editor
      </HeaderCta>
    );
  }, []);

  return (
    <Header
      $scrolled={isScrolled}
      $translucent={translucentOverHero}
      role="banner"
    >
      <Inner>
        <DesktopNav
          links={links}
          activeId={activeId}
          onNavigate={handleDesktopNavigate}
        />
        <Actions>
          {editorCta}
          <MobileNav
            links={links}
            activeId={activeId}
            isOpen={isOpen}
            onToggle={toggleDrawer}
            onClose={closeDrawer}
            onNavigate={handleMobileNavigate}
            drawerId={DRAWER_ID}
            toggleRef={toggleButtonRef}
            drawerRef={drawerRef}
            cta={mobileCta}
          />
        </Actions>
      </Inner>
    </Header>
  );
}
