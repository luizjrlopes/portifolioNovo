export type NavLink = {
  id: string;
  label: string;
  href: string;
};

export type NavClickHandler = (link: NavLink) => void;

export interface NavigationProps {
  links: NavLink[];
  /** compensacao do header sticky para rolagem suave */
  offsetPx?: number;
  /** define se o header inicia translucido sobre o hero */
  translucentOverHero?: boolean;
  /** callback opcional para telemetria de navegacao */
  onNavClick?: NavClickHandler;
}
