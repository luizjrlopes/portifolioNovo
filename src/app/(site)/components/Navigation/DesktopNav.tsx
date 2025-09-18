import type { MouseEvent } from "react";
import type { NavLink } from "../../types/navigation";
import {
  DesktopNavContainer,
  DesktopNavItem,
  DesktopNavLink,
  DesktopNavList,
} from "./styles";

type DesktopNavProps = {
  links: NavLink[];
  activeId: string | null;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, link: NavLink) => void;
};

export function DesktopNav({ links, activeId, onNavigate }: DesktopNavProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <DesktopNavContainer aria-label="Navegacao principal">
      <DesktopNavList role="list">
        {links.map((link) => (
          <DesktopNavItem key={link.id}>
            <DesktopNavLink
              href={link.href}
              $active={activeId === link.id}
              onClick={(event) => onNavigate(event, link)}
              aria-current={activeId === link.id ? "page" : undefined}
            >
              {link.label}
            </DesktopNavLink>
          </DesktopNavItem>
        ))}
      </DesktopNavList>
    </DesktopNavContainer>
  );
}
