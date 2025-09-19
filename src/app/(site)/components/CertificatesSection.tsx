"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { CertificateTab, CertificateCategories } from "../types";
import { hexToRgba } from "@/utils/color";
import { Award } from "lucide-react";

type Props = {
  tabs: CertificateTab[];
  categories: CertificateCategories;
  title?: string;
};

const Section = styled.section`
  padding: 72px 0;
  background: #0f111a;
  color: #eaeaea;
`;

const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
`;

const Heading = styled.h2`
  margin: 0 0 12px 0;
  font-size: clamp(1.6rem, 2.4vw, 2rem);
`;

const TabsBar = styled.div.attrs({ role: "tablist" })`
  display: flex;
  gap: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  overflow-x: auto;
  padding: 8px 2px 10px 2px;
  margin-bottom: 14px;
`;

const TabBtn = styled.button<{ $active?: boolean }>`
  appearance: none;
  border: 1px solid
    ${({ $active }) => ($active ? "rgba(0,173,181,.45)" : "transparent")};
  background: ${({ $active }) =>
    $active ? "rgba(0,173,181,.12)" : "transparent"};
  color: ${({ $active }) => ($active ? "#c7fbff" : "#cfd8df")};
  border-radius: 10px;
  padding: 8px 14px;
  font-weight: 600;
  letter-spacing: 0.2px;
  cursor: pointer;
  white-space: nowrap;
  transition: 0.2s ease;
  &:hover {
    background: rgba(122, 216, 221, 0.08);
  }
  &:focus-visible {
    outline: 2px solid #00adb5;
    outline-offset: 2px;
  }
`;

const Shell = styled.div`
  position: relative;
`;
const Viewport = styled.div`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
`;
const Track = styled.div`
  display: flex;
  will-change: transform;
  touch-action: pan-y pinch-zoom;
`;

// 1 por view no mobile; 2 no tablet; 3 no desktop
const Slide = styled.div`
  flex: 0 0 100%;
  min-width: 0;
  padding: 18px;
  box-sizing: border-box;
  @media (min-width: 540px) {
    flex-basis: 50%;
  }
  @media (min-width: 960px) {
    flex-basis: 33.3333%;
  }
`;

const Card = styled.article`
  height: 100%;
  display: grid;
  grid-template-columns: 52px 1fr;
  gap: 12px;
  align-items: center;
  padding: 14px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);
`;

const Logo = styled.img`
  width: 52px;
  height: 52px;
  object-fit: contain;
  border-radius: 8px;
  background: ${() => hexToRgba("#ffffff", 0.02)};
  border: 1px solid ${() => hexToRgba("#ffffff", 0.06)};
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
  }
  svg {
    color: #00adb5;
  }
`;

const Issued = styled.p`
  margin: 2px 0 0 0;
  font-size: 0.9rem;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.65)};
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.border, 0.6)};
  background: ${({ theme }) => hexToRgba(theme.colors.bg, 0.7)};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Prev = styled(NavButton)`
  left: 10px;
`;
const Next = styled(NavButton)`
  right: 10px;
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
`;
const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? 22 : 10)}px;
  height: 10px;
  border-radius: 999px;
  border: 0;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.accent : hexToRgba(theme.colors.text, 0.4)};
  transition: 0.2s ease;
`;

// ================== component ==================
export default function CertificatesSection({
  tabs,
  categories,
  title = "Certificados",
}: Props) {
  const [active, setActive] = useState<string>(
    tabs[0]?.id ?? Object.keys(categories)[0] ?? ""
  );
  const items = useMemo(() => categories[active] ?? [], [categories, active]);

  const [selected, setSelected] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [Autoplay({ delay: 4500, stopOnInteraction: false })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    // Cleanup listeners on unmount or emblaApi change
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // re-init quando troca a aba
  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, items]);

  const prev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const to = useCallback(
    (i: number) => emblaApi && emblaApi.scrollTo(i),
    [emblaApi]
  );

  return (
    <Section>
      <Container>
        <Heading>{title}</Heading>

        <TabsBar>
          {tabs.map((t) => (
            <TabBtn
              key={t.id}
              role="tab"
              aria-selected={t.id === active}
              aria-controls={`panel-${t.id}`}
              $active={t.id === active}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </TabBtn>
          ))}
        </TabsBar>

        {items.length === 0 ? (
          <p style={{ color: hexToRgba("#eaeaea", 0.7) }}>
            Nenhum certificado nesta categoria… ainda.
          </p>
        ) : (
          <>
            <Shell
              aria-roledescription="carousel"
              aria-label={`Certificados - ${
                tabs.find((x) => x.id === active)?.label || active
              }`}
            >
              <Viewport
                ref={emblaRef}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft") prev();
                  if (e.key === "ArrowRight") next();
                }}
              >
                <Track>
                  {items.map((c, i) => (
                    <Slide
                      key={`${c.title}-${i}`}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${i + 1} de ${items.length}`}
                    >
                      <Card>
                        <Logo src={c.logo} alt={c.alt} />
                        <div>
                          <TitleRow>
                            <Award size={16} />
                            <h3>{c.title}</h3>
                          </TitleRow>
                          <Issued>{c.issued}</Issued>
                        </div>
                      </Card>
                    </Slide>
                  ))}
                </Track>
              </Viewport>

              {items.length > 1 && (
                <>
                  <Prev aria-label="Anterior" onClick={prev}>
                    ‹
                  </Prev>
                  <Next aria-label="Próximo" onClick={next}>
                    ›
                  </Next>
                </>
              )}
            </Shell>

            {items.length > 1 && (
              <Dots>
                {items.map((c, i) => (
                  <Dot
                    key={`${c.title}-${i}`}
                    $active={i === selected}
                    onClick={() => to(i)}
                    aria-label={`Ir para ${c.title}`}
                  />
                ))}
              </Dots>
            )}
          </>
        )}
      </Container>
    </Section>
  );
}
