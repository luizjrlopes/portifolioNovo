"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import CompetenciesSection from "./components/CompetenciesSection";
import SoftSkillsSection from "./components/SoftSkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ArticlesSection from "./components/ArticlesSection";
import CertificatesSection from "./components/CertificatesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { navLinks, projects, contactOptions, footerText } from "./mock/content";
import { heroContent } from "./mock/hero";
import { aboutContent } from "./mock/about";
import { competenciesTabsContent } from "./mock/competencies";
import { softSkillsContent } from "./mock/softSkills";
import type { ArticleSummary } from "./types";
import { getArticlesIndex } from "./services/blobStorage";

const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
`;

export default function Home() {
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState<boolean>(false);
  const [articlesError, setArticlesError] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    const loadArticles = async () => {
      setIsLoadingArticles(true);
      setArticlesError("");

      try {
        const list = await getArticlesIndex();
        if (!isMounted) return;
        setArticles(list);
      } catch (error) {
        console.error(error);
        if (!isMounted) return;
        const message =
          error instanceof Error ? error.message : "Erro ao carregar artigos";
        setArticlesError(message);
      } finally {
        if (isMounted) {
          setIsLoadingArticles(false);
        }
      }
    };

    void loadArticles();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageWrapper>
      <Navigation links={navLinks} />
      <MainContent>
        <Hero content={heroContent} />
        <AboutSection content={aboutContent} />
        <CompetenciesSection content={competenciesTabsContent} />
        <SoftSkillsSection content={softSkillsContent} />
        <ProjectsSection projects={projects} />
        <ArticlesSection
          articles={articles}
          isLoading={isLoadingArticles}
          error={articlesError}
        />
        <CertificatesSection />
        <ContactSection options={contactOptions} />
      </MainContent>
      <Footer text={footerText} />
    </PageWrapper>
  );
}
