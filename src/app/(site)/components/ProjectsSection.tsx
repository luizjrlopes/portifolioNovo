import { useMemo, useState } from "react";
import styled from "styled-components";
import { hexToRgba } from "@/utils/color";
import type { ProjectPreview } from "../types";

type ProjectsSectionProps = {
  projects?: ProjectPreview[];
};

const ProjectsSectionRoot = styled.section.attrs({
  id: "projects",
  tabIndex: -1,
  "aria-labelledby": "projects-heading",
})`
  padding: 96px 0;
`;

const ProjectsContainer = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const SectionTitle = styled.h2`
  margin: 0;
  text-align: center;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  color: ${({ theme }) => theme.colors.text};
`;

const CarouselShell = styled.div`
  position: relative;
`;

const CarouselViewport = styled.div`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
`;

const Slides = styled.div<{ $index: number }>`
  display: flex;
  transition: transform 0.5s ease;
  transform: ${({ $index }) => `translateX(-${$index * 100}%)`};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Slide = styled.div`
  width: 100%;
  flex-shrink: 0;
  padding: 48px 24px;
`;

const SlideCard = styled.article`
  max-width: 520px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  box-shadow: 0 18px 35px rgba(0, 0, 0, 0.25);
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const SlideTitle = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.text};
`;

const SlideStack = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.6)};
`;

const SlideLink = styled.a`
  justify-self: center;
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

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 24px ${({ theme }) => hexToRgba(theme.colors.accent, 0.3)};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
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
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
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
  transition: width 0.2s ease, background-color 0.2s ease;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const items = useMemo<ProjectPreview[]>(() => projects ?? [], [projects]);
  const total = items.length;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const goTo = (index: number) => {
    if (total === 0) return;
    const normalized = (index + total) % total;
    setCurrentIndex(normalized);
  };

  const handlePrev = () => goTo(currentIndex - 1);
  const handleNext = () => goTo(currentIndex + 1);

  return (
    <ProjectsSectionRoot>
      <ProjectsContainer>
        <SectionTitle id="projects-heading">Projetos</SectionTitle>
        <CarouselShell>
          <CarouselViewport>
            <Slides $index={currentIndex}>
              {items.map(({ title, stack, href }) => (
                <Slide key={title}>
                  <SlideCard>
                    <SlideTitle>{title}</SlideTitle>
                    <SlideStack>{stack}</SlideStack>
                    <SlideLink href={href}>
                      Ver no GitHub
                    </SlideLink>
                  </SlideCard>
                </Slide>
              ))}
            </Slides>
          </CarouselViewport>

          {total > 1 && (
            <>
              <PrevButton type="button" onClick={handlePrev} aria-label="Projeto anterior">
                <NavIcon aria-hidden="true">&lt;</NavIcon>
              </PrevButton>
              <NextButton type="button" onClick={handleNext} aria-label="Proximo projeto">
                <NavIcon aria-hidden="true">&gt;</NavIcon>
              </NextButton>
            </>
          )}
        </CarouselShell>

        {total > 1 && (
          <Dots>
            {items.map((item, index) => {
              const isActive = index === currentIndex;
              return (
                <Dot
                  key={item.title}
                  type="button"
                  $active={isActive}
                  onClick={() => goTo(index)}
                  aria-label={`Ir para o projeto ${item.title}`}
                  aria-current={isActive ? "page" : undefined}
                />
              );
            })}
          </Dots>
        )}
      </ProjectsContainer>
    </ProjectsSectionRoot>
  );
}


