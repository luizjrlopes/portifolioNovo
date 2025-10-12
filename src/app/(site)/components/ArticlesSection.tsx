"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { FileText, ExternalLink } from "lucide-react";
import { hexToRgba } from "@/utils/color";
import type { ArticleSummary } from "../types";
import Modal from "react-modal";
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
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 2.4em; // Garante espaço para 2 linhas
`;

const CardSummary = styled.p`
  margin: 8px 0 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const CardFooter = styled.footer`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const DateDisplay = styled.time`
  font-weight: 500;
`;

const OpenButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.accent}20;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accent}30;
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

function groupByCategory(list: ArticleSummary[]) {
  const groups = new Map<string, ArticleSummary[]>();

  if (list.length) {
    groups.set("Todos", [...list]);
  }

  for (const article of list) {
    const category = article.category?.trim() || "Outros";
    if (!groups.has(category)) {
      groups.set(category, []);
    }
    groups.get(category)!.push(article);
  }

  return groups;
}

export default function ArticlesSection({
  articles,
  title = "Artigos",
}: Props) {
  const groups = useMemo(() => groupByCategory(articles), [articles]);
  const tabs = useMemo(() => Array.from(groups.keys()), [groups]);

  const [active, setActive] = useState<string>("Todos");

  useEffect(() => {
    if (!tabs.length) {
      setActive("Todos");
      return;
    }

    if (!tabs.includes(active)) {
      setActive(tabs[0]);
    }
  }, [tabs, active]);
  const items = useMemo(() => groups.get(active) ?? [], [groups, active]);

  const [selected, setSelected] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<{
    title: string;
    url: string;
  } | null>(null);

  const openPdfModal = (title: string, url: string) => {
    setSelectedPdf({ title, url });
    setIsPdfModalOpen(true);
  };

  const closePdfModal = () => {
    setIsPdfModalOpen(false);
    setSelectedPdf(null);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "clamp(360px, 80vw, 1100px)",
      height: "85vh",
      background: "#0b0e14",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "14px",
      padding: "0",
      overflow: "hidden",
    },
    overlay: {
      backgroundColor: "rgba(10, 10, 10, 0.75)",
      zIndex: 1000,
    },
  };

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
                  {items.map((article, i) => {
                    const cover = article.cover;
                    const pdfUrl = article.pdfUrl;
                    const resolvedDescription =
                      article.description ?? article.summary ?? "";
                    const resolvedDateISO = article.date ?? article.createdAt;
                    const parsedDate = resolvedDateISO
                      ? new Date(resolvedDateISO)
                      : null;
                    const safeDateLabel =
                      parsedDate && !Number.isNaN(parsedDate.getTime())
                        ? parsedDate.toLocaleDateString("pt-BR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Data não disponível";

                    return (
                      <Slide
                        key={`${article.id}-${i}`}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${i + 1} de ${items.length}`}
                      >
                        <Card
                          onClick={() =>
                            pdfUrl && openPdfModal(article.title, pdfUrl)
                          }
                          title="Abrir PDF"
                        >
                          <Thumb $src={cover}>
                            {!cover && <FileText size={28} aria-hidden />}
                          </Thumb>
                          <Meta>
                            <CardContent>
                              <CardTitle>{article.title}</CardTitle>
                              <CardSummary>{resolvedDescription}</CardSummary>
                              <CardFooter>
                                <DateDisplay dateTime={resolvedDateISO ?? ""}>
                                  {safeDateLabel}
                                </DateDisplay>
                                {pdfUrl && (
                                  <OpenButton
                                    href={pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <FileText size={14} />
                                    Abrir
                                  </OpenButton>
                                )}
                              </CardFooter>
                            </CardContent>
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
                    key={`${a.id}-${i}`}
                    $active={i === selected}
                    onClick={() => to(i)}
                    aria-label={`Ir para ${a.title}`}
                  />
                ))}
              </Dots>
            )}
          </>
        )}
      </Container>
      {selectedPdf && (
        <Modal
          isOpen={isPdfModalOpen}
          onRequestClose={closePdfModal}
          contentLabel={`PDF: ${selectedPdf.title}`}
          style={customStyles}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <header
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 16px",
                background: "rgba(15, 17, 26, 0.95)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                flexShrink: 0,
              }}
            >
              <h3
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  margin: 0,
                  color: "#eaeaea",
                }}
              >
                <FileText size={16} /> {selectedPdf.title}
              </h3>
              <button
                onClick={closePdfModal}
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  background: "rgba(255, 255, 255, 0.06)",
                  color: "#eaeaea",
                  borderRadius: "10px",
                  width: "36px",
                  height: "32px",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                }}
              >
                X
              </button>
            </header>
            <div style={{ flex: 1, position: "relative" }}>
              <iframe
                src={selectedPdf.url}
                title={selectedPdf.title}
                style={{ width: "100%", height: "100%", border: 0 }}
              />
              <div style={{ position: "absolute", right: 16, bottom: 12 }}>
                <a
                  href={selectedPdf.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#a8f5ff",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <ExternalLink size={14} /> abrir em nova aba
                </a>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </Section>
  );
}
