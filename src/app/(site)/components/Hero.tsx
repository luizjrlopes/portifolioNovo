/* eslint-disable @next/next/no-img-element */
"use client";

import type { MouseEvent } from "react";
import styled from "styled-components";
import { hexToRgba } from "@/utils/color";
import type { HeroContent, HeroCTA } from "../types";

type HeroProps = {
  content: HeroContent;
};

const DEFAULT_OFFSET = 80;

const HeroSection = styled.section.attrs({
  id: "home",
  tabIndex: -1,
  "aria-labelledby": "hero-title",
})`
  padding: 144px 0 104px;
`;

const HeroContainer = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  gap: ${({ theme }) => theme.spacing(6)};
  align-items: center;
  text-align: center;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    text-align: left;
    gap: ${({ theme }) => theme.spacing(8)};
  }
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const Badge = styled.span`
  align-self: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => hexToRgba(theme.colors.accent, 0.14)};

  @media (min-width: 1024px) {
    align-self: flex-start;
  }
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-size: clamp(2.5rem, 5vw, 3.8rem);
  line-height: 1.1;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const HeroSubtitle = styled.p`
  margin: 0;
  font-size: clamp(1.125rem, 2.25vw, 1.5rem);
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.75)};
  line-height: 1.65;
`;

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};

  @media (min-width: 1024px) {
    justify-content: flex-start;
  }
`;

const BaseButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 28px;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease,
    background-color 0.2s ease, color 0.2s ease;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const PrimaryButton = styled(BaseButton)`
  color: ${({ theme }) => theme.colors.bg};
  background: ${({ theme }) => theme.colors.accent};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 14px 28px
      ${({ theme }) => hexToRgba(theme.colors.accent, 0.3)};
  }
`;

const SecondaryButton = styled(BaseButton)`
  color: ${({ theme }) => theme.colors.accent};
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.accent, 0.4)};
  background: transparent;

  &:hover {
    background: ${({ theme }) => hexToRgba(theme.colors.accent, 0.1)};
  }
`;

const MediaColumn = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: 1024px) {
    justify-content: flex-end;
  }
`;

const PortraitShell = styled.div`
  width: clamp(220px, 26vw, 280px);
  aspect-ratio: 1 / 1;
  border-radius: 36px;
  padding: 6px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
  box-shadow: 0 24px 44px rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PortraitImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 30px;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.bg};
`;

const StatsGrid = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: ${({ theme }) => theme.spacing(2)};
  margin: 0;
`;

const StatItem = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.border, 0.7)};
  background: ${({ theme }) => hexToRgba(theme.colors.card, 0.6)};
  text-align: left;
`;

const StatValue = styled.dt`
  margin: 0;
  font-size: 1.65rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const StatLabel = styled.dd`
  margin: 6px 0 0;
  font-size: 0.9rem;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.65)};
`;

export default function Hero({ content }: HeroProps) {
  const {
    title,
    subtitle,
    imageUrl,
    imageAlt,
    primaryCta,
    secondaryCta,
    badge,
    stats,
    scrollOffsetPx,
  } = content;

  const offset = scrollOffsetPx ?? DEFAULT_OFFSET;

  const handleAnchorClick =
    (cta?: HeroCTA) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (!cta || !cta.href.startsWith("#") || typeof window === "undefined") {
        return;
      }

      const targetId = cta.href.slice(1);
      const targetElement = document.getElementById(targetId);

      if (!targetElement) {
        return;
      }

      event.preventDefault();

      const rect = targetElement.getBoundingClientRect();
      const top = Math.max(window.scrollY + rect.top - offset, 0);
      const reduceMotion =
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ??
        false;

      window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });

      const focusTarget = () => targetElement.focus({ preventScroll: true });
      if (reduceMotion) {
        focusTarget();
      } else {
        window.setTimeout(focusTarget, 360);
      }
    };

  return (
    <HeroSection>
      <HeroContainer>
        <ContentColumn>
          {badge?.text ? <Badge>{badge.text}</Badge> : null}
          <HeroTitle id="hero-title">{title}</HeroTitle>
          {subtitle ? <HeroSubtitle>{subtitle}</HeroSubtitle> : null}
          {(primaryCta || secondaryCta) && (
            <CtaRow>
              {primaryCta ? (
                <PrimaryButton
                  href={primaryCta.href}
                  rel={primaryCta.rel}
                  target={primaryCta.target}
                  onClick={handleAnchorClick(primaryCta)}
                >
                  {primaryCta.label}
                </PrimaryButton>
              ) : null}
              {secondaryCta ? (
                <SecondaryButton
                  href={secondaryCta.href}
                  rel={secondaryCta.rel}
                  target={secondaryCta.target}
                  onClick={handleAnchorClick(secondaryCta)}
                >
                  {secondaryCta.label}
                </SecondaryButton>
              ) : null}
            </CtaRow>
          )}
          {/* 
          {stats && stats.length > 0 ? (
            <StatsGrid aria-label="Metricas pessoais">
              {stats.map((item) => (
                <StatItem key={`${item.label}-${item.value}`}>
                  <StatValue>{item.value}</StatValue>
                  <StatLabel>{item.label}</StatLabel>
                </StatItem>
              ))}
            </StatsGrid>
          ) : null}
          */}
        </ContentColumn>
        <MediaColumn>
          {imageUrl ? (
            <PortraitShell>
              <PortraitImage src={imageUrl} alt={imageAlt ?? title} />
            </PortraitShell>
          ) : null}
        </MediaColumn>
      </HeroContainer>
    </HeroSection>
  );
}
