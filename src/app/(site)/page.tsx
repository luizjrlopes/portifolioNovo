"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import CompetenciesSection from "./components/CompetenciesSection";
import ProjectsSection from "./components/ProjectsSection";
import ArticlesSection from "./components/ArticlesSection";
import CertificatesSection from "./components/CertificatesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import {
  ProjectsSkeleton,
  ArticlesSkeleton,
  CertificatesSkeleton,
  CompetenciesSkeleton,
} from "@/components/SkeletonLoader";
import { navLinks, contactOptions, footerText } from "./mock/content";
import { heroContent } from "./mock/hero";
import { aboutContent } from "./mock/about";
import type { ArticleSummary, Project, Competency, Certificate } from "./types";
import { getProjects } from "@/lib/data-fetchers/projects";
import { getArticles } from "@/lib/data-fetchers/articles";
import { getCompetencies } from "@/lib/data-fetchers/competencies";
import { getCertificates } from "@/lib/data-fetchers/certificates";

const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
`;

export default function Home() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [articles, setArticles] = useState<ArticleSummary[] | null>(null);
  const [competencies, setCompetencies] = useState<Competency[] | null>(null);
  const [certificates, setCertificates] = useState<Certificate[] | null>(null);

  // Estados de loading individuais
  const [loadingStates, setLoadingStates] = useState({
    projects: true,
    articles: true,
    competencies: true,
    certificates: true,
  });

  // Carregar dados de forma progressiva
  useEffect(() => {
    let cancelled = false;

    // Carrega competências primeiro (são dados locais, mais rápidos)
    const loadCompetencies = async () => {
      try {
        const data = await getCompetencies();
        if (!cancelled) {
          setCompetencies(data);
          setLoadingStates((prev) => ({ ...prev, competencies: false }));
        }
      } catch (error) {
        console.error("Failed to load competencies", error);
        if (!cancelled) {
          setLoadingStates((prev) => ({ ...prev, competencies: false }));
        }
      }
    };

    // Carrega projetos
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        if (!cancelled) {
          setProjects(data);
          setLoadingStates((prev) => ({ ...prev, projects: false }));
        }
      } catch (error) {
        console.error("Failed to load projects", error);
        if (!cancelled) {
          setLoadingStates((prev) => ({ ...prev, projects: false }));
        }
      }
    };

    // Carrega artigos
    const loadArticles = async () => {
      try {
        const data = await getArticles();
        if (!cancelled) {
          setArticles(data);
          setLoadingStates((prev) => ({ ...prev, articles: false }));
        }
      } catch (error) {
        console.error("Failed to load articles", error);
        if (!cancelled) {
          setLoadingStates((prev) => ({ ...prev, articles: false }));
        }
      }
    };

    // Carrega certificados
    const loadCertificates = async () => {
      try {
        const data = await getCertificates();
        if (!cancelled) {
          setCertificates(data);
          setLoadingStates((prev) => ({ ...prev, certificates: false }));
        }
      } catch (error) {
        console.error("Failed to load certificates", error);
        if (!cancelled) {
          setLoadingStates((prev) => ({ ...prev, certificates: false }));
        }
      }
    };

    // Carrega em ordem de prioridade
    loadCompetencies();
    loadProjects();

    // Adiciona um pequeno delay para não sobrecarregar
    setTimeout(loadArticles, 100);
    setTimeout(loadCertificates, 200);

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PageWrapper>
      <Navigation links={navLinks} />
      <MainContent>
        <Hero content={heroContent} />
        <AboutSection content={aboutContent} />

        {/* Competências com skeleton */}
        {loadingStates.competencies ? (
          <CompetenciesSkeleton />
        ) : (
          competencies &&
          competencies.length > 0 && (
            <CompetenciesSection competencies={competencies} />
          )
        )}

        {/* Projetos com skeleton */}
        {loadingStates.projects ? (
          <ProjectsSkeleton />
        ) : (
          <ProjectsSection projects={projects ?? undefined} />
        )}

        {/* Artigos com skeleton */}
        {loadingStates.articles ? (
          <ArticlesSkeleton />
        ) : (
          articles &&
          articles.length > 0 && <ArticlesSection articles={articles} />
        )}

        {/* Certificados com skeleton */}
        {loadingStates.certificates ? (
          <CertificatesSkeleton />
        ) : (
          certificates &&
          certificates.length > 0 && (
            <CertificatesSection certificates={certificates} />
          )
        )}

        <ContactSection options={contactOptions} />
      </MainContent>
      <Footer text={footerText} />
    </PageWrapper>
  );
}
