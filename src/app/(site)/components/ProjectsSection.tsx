"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styled from "styled-components";
import { hexToRgba } from "@/utils/color";
import type { Project } from "../types";

type Props = { projects: Project[] };

// ====== estilos (reaproveitando os seus) ======
const Root = styled.section.attrs({
  id: "projects",
  tabIndex: -1,
  "aria-labelledby": "projects-heading",
})`
  padding: 96px 0;
`;
const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;
const Title = styled.h2`
  margin: 0;
  text-align: center;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  color: ${({ theme }) => theme.colors.text};
`;

const Viewport = styled.div`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
`;

const ContainerTrack = styled.div`
  display: flex;
  touch-action: pan-y pinch-zoom;
  will-change: transform;
`;
const Slide = styled.div`
  flex: 0 0 100%;
  min-width: 0;
  padding: 48px 24px;
  box-sizing: border-box;
`;
const Card = styled.article`
  max-width: 520px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 18px 35px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  min-height: 450px; // Altura mínima para consistência
`;
const SlideTitle = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;
const SlideStack = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.6)};
  min-height: 40px; // Garante altura mínima para consistência
`;

const SlideDescription = styled.p`
  margin: ${({ theme }) => theme.spacing(2)} 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
  line-height: 1.6;
  flex-grow: 1; // Ocupa o espaço disponível
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(1)};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const Tag = styled.span`
  background-color: ${({ theme }) =>
    theme.colors.accent}20; // Fundo com opacidade
  color: ${({ theme }) => theme.colors.accent};
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  justify-content: center;
  margin-top: auto; // Empurra para o final do card
  padding-top: ${({ theme }) => theme.spacing(2)};
`;

const SlideLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.bg};
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid transparent;

  &.secondary {
    background: transparent;
    color: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 24px
      ${({ theme }) => hexToRgba(theme.colors.accent, 0.3)};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
  }
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
const PrevButton = styled(NavButton)`
  left: 18px;
`;
const NextButton = styled(NavButton)`
  right: 18px;
`;
const NavIcon = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
`;

const Shell = styled.div`
  position: relative;
`;
const Dots = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;
const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? 24 : 10)}px;
  height: 10px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.accent : hexToRgba(theme.colors.text, 0.4)};
`;

// ====== componente ======
export default function ProjectsSection({ projects }: Props) {
  const items = useMemo<Project[]>(() => projects ?? [], [projects]);
  const [selected, setSelected] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [Autoplay({ delay: 5500, stopOnInteraction: false })]
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

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (i: number) => emblaApi && emblaApi.scrollTo(i),
    [emblaApi]
  );

  if (!items.length) return null;

  return (
    <Root aria-roledescription="carousel" aria-label="Projetos">
      <Container>
        <Title id="projects-heading">Projetos</Title>

        <Shell>
          <Viewport
            ref={emblaRef}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") scrollPrev();
              if (e.key === "ArrowRight") scrollNext();
            }}
            tabIndex={0}
            aria-live="polite"
          >
            <ContainerTrack>
              {items.map((project) => (
                <Slide
                  key={project.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${items.indexOf(project) + 1} de ${
                    items.length
                  }`}
                >
                  <Card>
                    <SlideTitle>{project.title}</SlideTitle>

                    <SlideDescription>
                      {project.description || "Sem descrição."}
                    </SlideDescription>

                    {project.tags && project.tags.length > 0 && (
                      <TagsContainer>
                        {project.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </TagsContainer>
                    )}

                    <LinksContainer>
                      {project.repoUrl && (
                        <SlideLink
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="secondary"
                        >
                          Repositório
                        </SlideLink>
                      )}
                      {project.liveUrl && (
                        <SlideLink
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver Online
                        </SlideLink>
                      )}
                    </LinksContainer>
                  </Card>
                </Slide>
              ))}
            </ContainerTrack>
          </Viewport>

          {items.length > 1 && (
            <>
              <PrevButton
                type="button"
                onClick={scrollPrev}
                aria-label="Projeto anterior"
              >
                <NavIcon aria-hidden="true">&lt;</NavIcon>
              </PrevButton>
              <NextButton
                type="button"
                onClick={scrollNext}
                aria-label="Próximo projeto"
              >
                <NavIcon aria-hidden="true">&gt;</NavIcon>
              </NextButton>
            </>
          )}
        </Shell>

        {items.length > 1 && (
          <Dots>
            {items.map((it, i) => (
              <Dot
                key={it.title}
                $active={i === selected}
                onClick={() => scrollTo(i)}
                aria-label={`Ir para o projeto ${it.title}`}
              />
            ))}
          </Dots>
        )}
      </Container>
    </Root>
  );
}
