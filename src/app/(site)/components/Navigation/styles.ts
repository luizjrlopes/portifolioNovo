import styled, { css } from "styled-components";
import { hexToRgba } from "@/utils/color";

const focusRing = css`
  outline: 2px solid ${({ theme }) => theme.colors.accent};
  outline-offset: 3px;
`;

export const Header = styled.header<{ $scrolled: boolean; $translucent: boolean }>`
  position: sticky;
  top: 0;
  z-index: 40;
  width: 100%;
  backdrop-filter: ${({ $translucent, $scrolled }) =>
    $translucent || $scrolled ? "blur(12px)" : "none"};
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;

  ${({ theme, $scrolled, $translucent }) => css`
    background: ${$scrolled || !$translucent
      ? theme.colors.card
      : hexToRgba(theme.colors.bg, 0.65)};
    border-bottom: ${$scrolled
      ? `1px solid ${hexToRgba(theme.colors.border, 0.6)}`
      : "1px solid transparent"};
    box-shadow: ${$scrolled
      ? `0 18px 35px ${hexToRgba(theme.colors.bg, 0.55)}`
      : "none"};
  `}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Inner = styled.div`
  margin: 0 auto;
  max-width: 1120px;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const Brand = styled.a`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  letter-spacing: 0.02em;

  &:focus-visible {
    ${focusRing}
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const HeaderCta = styled.a<{ $fullWidth?: boolean }>`
  display: inline-flex;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;
  font-size: 0.95rem;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background: ${({ theme }) => hexToRgba(theme.colors.accent, 0.12)};
  }

  &:focus-visible {
    ${focusRing}
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @media (max-width: 767px) {
    display: ${({ $fullWidth }) => ($fullWidth ? "inline-flex" : "none")};
  }

  @media (min-width: 768px) {
    display: ${({ $fullWidth }) => ($fullWidth ? "none" : "inline-flex")};
  }
`;

export const DesktopNavContainer = styled.nav`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

export const DesktopNavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const DesktopNavItem = styled.li`
  margin: 0;
`;

export const DesktopNavLink = styled.a<{ $active: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 0.95rem;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.accent : theme.colors.text};
  transition: color 0.2s ease, background-color 0.2s ease;
  background: ${({ theme, $active }) =>
    $active ? hexToRgba(theme.colors.accent, 0.16) : "transparent"};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }

  &:focus-visible {
    ${focusRing}
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const MobileToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.border, 0.6)};
  background: ${({ theme }) => hexToRgba(theme.colors.bg, 0.7)};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
  }

  &:focus-visible {
    ${focusRing}
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export const MobileToggleIcon = styled.span<{ $open: boolean }>`
  position: relative;
  width: 18px;
  height: 2px;
  background: ${({ theme, $open }) =>
    $open ? "transparent" : theme.colors.text};
  transition: background 0.2s ease;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: 18px;
    height: 2px;
    background: ${({ theme }) => theme.colors.text};
    transition: transform 0.2s ease;
  }

  &::before {
    top: ${({ $open }) => ($open ? "0" : "-6px")};
    transform: ${({ $open }) => ($open ? "rotate(45deg)" : "none")};
  }

  &::after {
    top: ${({ $open }) => ($open ? "0" : "6px")};
    transform: ${({ $open }) => ($open ? "rotate(-45deg)" : "none")};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &::before,
    &::after {
      transition: none;
    }
  }
`;

export const Backdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => hexToRgba(theme.colors.bg, 0.6)};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 0.25s ease;
  z-index: 35;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Drawer = styled.aside<{ $open: boolean }>`
  position: fixed;
  inset: 0 0 0 auto;
  width: min(320px, 80vw);
  background: ${({ theme }) => theme.colors.card};
  border-left: 1px solid ${({ theme }) => hexToRgba(theme.colors.border, 0.6)};
  box-shadow: -20px 0 40px ${({ theme }) => hexToRgba(theme.colors.bg, 0.55)};
  transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  padding: 24px 20px;
  gap: 16px;
  z-index: 40;
  outline: none;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export const DrawerNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DrawerList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DrawerItem = styled.li`
  margin: 0;
`;

export const DrawerLink = styled.a<{ $active: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-radius: 12px;
  background: ${({ theme, $active }) =>
    $active ? hexToRgba(theme.colors.accent, 0.18) : hexToRgba(theme.colors.bg, 0.6)};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.accent : theme.colors.text};
  font-size: 1rem;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:focus-visible {
    ${focusRing}
  }

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const DrawerFooter = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;






