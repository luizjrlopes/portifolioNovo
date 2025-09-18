import type { MouseEvent, RefObject } from "react";
import type { NavLink } from "../../types/navigation";
import {
  Backdrop,
  Drawer,
  DrawerFooter,
  DrawerItem,
  DrawerLink,
  DrawerList,
  DrawerNav,
  MobileToggleButton,
  MobileToggleIcon,
  VisuallyHidden,
} from "./styles";

type MobileNavProps = {
  links: NavLink[];
  activeId: string | null;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, link: NavLink) => void;
  drawerId: string;
  toggleRef: RefObject<HTMLButtonElement>;
  drawerRef: RefObject<HTMLDivElement>;
  cta?: React.ReactNode;
};

export function MobileNav({
  links,
  activeId,
  isOpen,
  onToggle,
  onClose,
  onNavigate,
  drawerId,
  toggleRef,
  drawerRef,
  cta,
}: MobileNavProps) {
  const label = isOpen ? "Fechar menu" : "Abrir menu";

  return (
    <>
      <MobileToggleButton
        type="button"
        ref={toggleRef}
        aria-expanded={isOpen}
        aria-controls={drawerId}
        aria-haspopup="dialog"
        onClick={onToggle}
      >
        <MobileToggleIcon aria-hidden="true" $open={isOpen} />
        <VisuallyHidden>{label}</VisuallyHidden>
      </MobileToggleButton>

      <Backdrop $open={isOpen} onClick={onClose} aria-hidden="true" />

      <Drawer
        ref={drawerRef}
        $open={isOpen}
        id={drawerId}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegacao"
        tabIndex={-1}
      >
        <DrawerNav aria-label="Navegacao principal mobile">
          <DrawerList role="list">
            {links.map((link) => (
              <DrawerItem key={link.id}>
                <DrawerLink
                  href={link.href}
                  $active={activeId === link.id}
                  aria-current={activeId === link.id ? "page" : undefined}
                  onClick={(event) => onNavigate(event, link)}
                >
                  {link.label}
                </DrawerLink>
              </DrawerItem>
            ))}
          </DrawerList>
        </DrawerNav>

        {cta ? <DrawerFooter>{cta}</DrawerFooter> : null}
      </Drawer>
    </>
  );
}
