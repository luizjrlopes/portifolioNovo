"use client";

import styled from "styled-components";
import { hexToRgba } from "@/utils/color";
import type { Project } from "../types";

type Props = {
  projects?: Project[];
  title?: string;
  description?: string;
};

const Section = styled.section.attrs({ id: "projects" })`
  padding: 88px 0;
  background: ${({ theme }) => hexToRgba(theme.colors.bg, 0.98)};
`;

const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  gap: ${({ theme }) => theme.spacing(5)};
`;

const HeadingWrapper = styled.header`
  text-align: center;
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const Heading = styled.h2`
  margin: 0;
  font-size: clamp(1.9rem, 2.5vw, 2.4rem);
  color: ${({ theme }) => theme.colors.text};
`;

const Subheading = styled.p`
  margin: 0;
  color: ${({ theme }) => hexToRgba(theme.colors.textSecondary, 0.9)};
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing(3)};
`;

const Card = styled.article`
  height: 100%;
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => hexToRgba(theme.colors.card, 0.98)};
  border: 1px solid ${({ theme }) => hexToRgba(theme.colors.border, 0.7)};
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.28);
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
  align-content: start;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 28px 60px rgba(0, 0, 0, 0.35);
    border-color: ${({ theme }) => hexToRgba(theme.colors.accent, 0.6)};
  }
`;

const CardHeader = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.35rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Tags = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const Tag = styled.li`
  padding: 6px 12px;
  border-radius: 999px;
  background: ${({ theme }) => hexToRgba(theme.colors.accent, 0.18)};
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.3px;
`;

const Actions = styled.div`
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const ActionLink = styled.a`
  padding: 10px 18px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid transparent;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.bg};
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 30px
      ${({ theme }) => hexToRgba(theme.colors.accent, 0.45)};
  }

  &.secondary {
    background: transparent;
    color: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => hexToRgba(theme.colors.accent, 0.6)};

    &:hover {
      background: ${({ theme }) => hexToRgba(theme.colors.accent, 0.12)};
    }
  }
`;

const EmptyState = styled.p`
  margin: 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export default function ProjectsSection({
  projects,
  title = "Projetos",
  description = "Portfólio pessoal com estudos, desafios e experiências reais.",
}: Props) {
  if (projects === undefined) {
    return null;
  }

  if (!projects.length) {
    return (
      <Section>
        <Container>
          <HeadingWrapper>
            <Heading>{title}</Heading>
            <Subheading>{description}</Subheading>
          </HeadingWrapper>
          <EmptyState>Sem projetos cadastrados no momento.</EmptyState>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <HeadingWrapper>
          <Heading>{title}</Heading>
          <Subheading>{description}</Subheading>
        </HeadingWrapper>

        <Grid>
          {projects.map((project) => (
            <Card key={project.id ?? project.title}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>

              <Description>
                {project.description ?? "Projeto em desenvolvimento."}
              </Description>

              {project.tags?.length ? (
                <Tags>
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Tags>
              ) : null}

              {(project.repoUrl || project.liveUrl) && (
                <Actions>
                  {project.repoUrl && (
                    <ActionLink
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="secondary"
                    >
                      Repositório
                    </ActionLink>
                  )}
                  {project.liveUrl && (
                    <ActionLink
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver Online
                    </ActionLink>
                  )}
                </Actions>
              )}
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
