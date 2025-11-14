"use client";

import { useCallback, useMemo } from "react";
import type { MouseEvent } from "react";
import type { NavigationProps, NavLink } from "../../types/navigation";
import { FEATURES } from "../../config/features";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { Actions, Header, HeaderCta, Inner } from "./styles";
import {
  useScrollDetection,
  useReducedMotion,
  useActiveSection,
  useMobileDrawer,
  useNavigation,
} from "./hooks";

const DRAWER_ID = "nav-drawer";

export default function Navigation({
  links,
  offsetPx = 80,
  translucentOverHero = true,
  onNavClick,
}: NavigationProps) {
  // Custom hooks
  const isScrolled = useScrollDetection(20);
  const reduceMotion = useReducedMotion();
  const { activeId, activeIdRef } = useActiveSection(links);
  const { isOpen, setIsOpen, drawerRef, toggleButtonRef } = useMobileDrawer();

  // Navigation logic
  const { scrollToLink } = useNavigation({
    offsetPx,
    reduceMotion,
    onNavClick,
    setActiveId: (id: string) => {
      activeIdRef.current = id;
    },
  });

  // Handlers
  const closeDrawer = useCallback(() => setIsOpen(false), [setIsOpen]);
  const toggleDrawer = useCallback(
    () => setIsOpen((open) => !open),
    [setIsOpen]
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
    [scrollToLink, setIsOpen]
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
