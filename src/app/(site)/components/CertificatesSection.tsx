"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { Certificate } from "../types";
import { hexToRgba } from "@/utils/color";
import { Award } from "lucide-react";
import Modal from "react-modal";

type Props = {
  certificates: Certificate[];
  title?: string;
};

const Section = styled.section.attrs({
  id: "certificates",
  tabIndex: -1,
})`
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

const Logo = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 8px;
  background: ${() => hexToRgba("#ffffff", 0.02)};
  border: 1px solid ${() => hexToRgba("#ffffff", 0.06)};
  display: inline-block;
  overflow: hidden;
  position: relative;
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
  &::before {
    content: "‹";
    font-size: 18px;
    line-height: 1;
  }
`;
const Next = styled(NavButton)`
  right: 10px;
  &::before {
    content: "›";
    font-size: 18px;
    line-height: 1;
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

function groupByCategory(list: Certificate[]) {
  const groups = new Map<string, Certificate[]>();
  for (const item of list) {
    const cat = item.category || "Todos";
    if (!groups.has(cat)) groups.set(cat, []);
    groups.get(cat)!.push(item);
  }
  return groups;
}

// ================== component ==================
export default function CertificatesSection({
  certificates,
  title = "Certificados",
}: Props) {
  const groups = useMemo(() => groupByCategory(certificates), [certificates]);
  const tabs = useMemo(() => Array.from(groups.keys()), [groups]);

  const [active, setActive] = useState<string>(tabs[0] ?? "Todos");
  const items = useMemo(() => groups.get(active) ?? [], [groups, active]);

  const [selected, setSelected] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [Autoplay({ delay: 4500, stopOnInteraction: false })]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    title: string;
  } | null>(null);

  const handlePreview = useCallback(
    (src: string, alt: string, title: string) => {
      setSelectedImage({ src, alt, title });
      setIsModalOpen(true);
    },
    []
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedImage(null);
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, items]);

  const prev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const to = useCallback(
    (i: number) => emblaApi && emblaApi.scrollTo(i),
    [emblaApi]
  );

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "transparent",
      border: "none",
      padding: 0,
    },
    overlay: {
      backgroundColor: "rgba(10, 10, 10, 0.85)",
      zIndex: 1000,
    },
  };

  if (!certificates?.length) return null;

  return (
    <Section>
      <Container>
        <Heading>{title}</Heading>

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

        {items.length === 0 ? (
          <p style={{ color: hexToRgba("#eaeaea", 0.7) }}>
            Nenhum certificado nesta categoria… ainda.
          </p>
        ) : (
          <>
            <Shell
              aria-roledescription="carousel"
              aria-label={`Certificados - ${active}`}
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
                      <Card
                        onClick={() =>
                          handlePreview(
                            typeof c.logo === "string"
                              ? (c.logo as string)
                              : (c.logo as any)?.src,
                            c.alt,
                            c.title
                          )
                        }
                      >
                        <Logo>
                          <Image
                            src={c.logo}
                            alt={c.alt}
                            width={52}
                            height={52}
                            style={{
                              objectFit: "contain",
                              display: "block",
                              width: 52,
                              height: 52,
                            }}
                          />
                        </Logo>
                        <div>
                          <TitleRow>
                            <Award size={16} />
                            <h3>{c.title}</h3>
                          </TitleRow>
                          <Issued>{c.issued}</Issued>
                          {c.description ? (
                            <p
                              style={{ margin: "6px 0 0 0", color: "#cfd8df" }}
                            >
                              {c.description}
                            </p>
                          ) : null}
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
      {selectedImage && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel={selectedImage.title}
          style={customStyles}
        >
          <Image
            src={selectedImage.src}
            alt={selectedImage.alt}
            width={1200}
            height={800}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              width: "auto",
              height: "auto",
            }}
          />
        </Modal>
      )}
    </Section>
  );
}
