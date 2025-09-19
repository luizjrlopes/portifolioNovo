"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { FileText, X, ExternalLink } from "lucide-react";
import { hexToRgba } from "@/utils/color";
import type { ArticleSummary } from "../types";

/**
 * Espera que ArticleSummary tenha pelo menos:
 * - title: string
 * - pdfUrl: string
 * Opcionais que melhoram a UI:
 * - category?: string
 * - cover?: string (thumbnail)
 * - description?: string
 * - date?: string
 */

type Props = {
  articles: ArticleSummary[];
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

// 1 por view mobile; 2 tablet; 3 desktop
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

const Card = styled.button`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 12px;
  align-items: center;
  padding: 14px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);
  text-align: left;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease,
    border-color 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.35);
    border-color: rgba(0, 173, 181, 0.35);
  }
`;

const Thumb = styled.div<{ $src?: string }>`
  width: 72px;
  height: 72px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  background: ${({ $src }) =>
    $src ? `center/cover no-repeat url(${$src})` : hexToRgba("#ffffff", 0.02)};
  border: 1px solid ${() => hexToRgba("#ffffff", 0.06)};
  display: grid;
  place-items: center;

  svg {
    color: #00adb5;
  }
`;

const Meta = styled.div`
  min-width: 0;
  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    color: #eaeaea;
  }
  p {
    margin: 4px 0 0 0;
    font-size: 0.9rem;
    color: ${({ theme }) => hexToRgba(theme.colors.text, 0.65)};
  }
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

/* ========== Modal PDF ========== */
const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: grid;
  place-items: center;
  z-index: 60;
  backdrop-filter: blur(2px);
`;

const ModalBody = styled.div`
  width: min(1100px, 92vw);
  height: min(85vh, 900px);
  background: #0b0e14;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.55);
`;

const ModalTop = styled.div`
  position: absolute;
  inset: 0 0 auto 0;
  height: 48px;
  background: rgba(15, 17, 26, 0.9);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  strong {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 60vw;
  }
  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #a8f5ff;
    text-decoration: none;
    font-size: 0.9rem;
  }
`;

const CloseBtn = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.06);
  color: #eaeaea;
  border-radius: 10px;
  width: 36px;
  height: 32px;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

const ModalContent = styled.div`
  position: absolute;
  inset: 48px 0 0 0;
  background: #0b0e14;
  iframe,
  object {
    width: 100%;
    height: 100%;
    border: 0;
    background: repeating-linear-gradient(
      45deg,
      #0b0e14,
      #0b0e14 10px,
      #0d1117 10px,
      #0d1117 20px
    );
  }
`;

function groupByCategory(list: ArticleSummary[]) {
  const groups = new Map<string, ArticleSummary[]>();
  for (const a of list) {
    const cat = (a.category || "Todos") as string;
    if (!groups.has(cat)) groups.set(cat, []);
    groups.get(cat)!.push(a);
  }
  return groups;
}

export default function ArticlesSection({
  articles,
  title = "Artigos",
}: Props) {
  const groups = useMemo(() => groupByCategory(articles), [articles]);
  const tabs = useMemo(() => Array.from(groups.keys()), [groups]);

  const [active, setActive] = useState<string>(tabs[0] ?? "Todos");
  const items = useMemo(() => groups.get(active) ?? [], [groups, active]);

  const [selected, setSelected] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const onSelect = useCallback(
    (api: any) => setSelected(api.selectedScrollSnap()),
    []
  );
  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
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

  // Modal
  const [openPdf, setOpenPdf] = useState<{ title: string; url: string } | null>(
    null
  );
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenPdf(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!articles?.length) return null;

  return (
    <Section>
      <Container>
        <Heading>{title}</Heading>

        {/* Abas por categoria */}
        <TabsBar>
          {tabs.map((t) => (
            <TabBtn
              key={t}
              role="tab"
              aria-selected={t === active}
              aria-controls={`panel-${t}`}
              $active={t === active}
              onClick={() => setActive(t)}
            >
              {t}
            </TabBtn>
          ))}
        </TabsBar>

        {/* Carrossel por categoria */}
        {items.length === 0 ? (
          <p style={{ color: hexToRgba("#eaeaea", 0.7) }}>
            Nenhum artigo nesta categoria… ainda.
          </p>
        ) : (
          <>
            <Shell
              aria-roledescription="carousel"
              aria-label={`Artigos - ${active}`}
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
                  {items.map((a, i) => {
                    const title = (a as any).title as string;
                    const pdfUrl = (a as any).pdfUrl as string;
                    const cover = (a as any).cover as string | undefined;
                    const desc =
                      ((a as any).description as string | undefined) ?? "";
                    const date = ((a as any).date as string | undefined) ?? "";

                    return (
                      <Slide
                        key={`${title}-${i}`}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${i + 1} de ${items.length}`}
                      >
                        <Card
                          onClick={() => setOpenPdf({ title, url: pdfUrl })}
                          title="Abrir PDF"
                        >
                          <Thumb $src={cover}>
                            {!cover && <FileText size={28} aria-hidden />}
                          </Thumb>
                          <Meta>
                            <h3>{title}</h3>
                            <p>
                              {date ? `${date}${desc ? " • " : ""}` : ""}
                              {desc}
                            </p>
                          </Meta>
                        </Card>
                      </Slide>
                    );
                  })}
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
                {items.map((a, i) => (
                  <Dot
                    key={`${(a as any).title}-${i}`}
                    $active={i === selected}
                    onClick={() => to(i)}
                    aria-label={`Ir para ${(a as any).title}`}
                  />
                ))}
              </Dots>
            )}
          </>
        )}
      </Container>

      {/* Modal PDF */}
      {openPdf && (
        <ModalBackdrop
          onClick={() => setOpenPdf(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`PDF: ${openPdf.title}`}
        >
          <ModalBody onClick={(e) => e.stopPropagation()}>
            <ModalTop>
              <ModalTitle>
                <FileText size={18} />
                <strong>{openPdf.title}</strong>
                <a href={openPdf.url} target="_blank" rel="noreferrer">
                  <ExternalLink size={16} /> abrir em nova aba
                </a>
              </ModalTitle>
              <CloseBtn onClick={() => setOpenPdf(null)} aria-label="Fechar">
                <X size={16} />
              </CloseBtn>
            </ModalTop>
            <ModalContent>
              {/* Tentativa embutida; alguns hosts bloqueiam embutir por headers. */}
              <object data={openPdf.url} type="application/pdf">
                <iframe src={openPdf.url} title={openPdf.title} />
              </object>
            </ModalContent>
          </ModalBody>
        </ModalBackdrop>
      )}
    </Section>
  );
}
