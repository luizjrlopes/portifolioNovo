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
import { navLinks, contactOptions, footerText } from "./mock/content";
import { heroContent } from "./mock/hero";
import { aboutContent } from "./mock/about";
import { competencies } from "./mock/competencies";
import type { ArticleSummary, Project } from "./types";
import { certificates } from "./mock/certificates";
import { getProjects } from "@/lib/data-fetchers/projects";
import { getArticles } from "@/lib/data-fetchers/articles";

const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
`;

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [articles, setArticles] = useState<ArticleSummary[]>([]);

  useEffect(() => {
    async function loadData() {
      const [fetchedProjects, fetchedArticles] = await Promise.all([
        getProjects(),
        getArticles(),
      ]);
      setProjects(fetchedProjects);
      setArticles(fetchedArticles);
    }
    loadData();
  }, []);

  return (
    <PageWrapper>
      <Navigation links={navLinks} />
      <MainContent>
        <Hero content={heroContent} />
        <AboutSection content={aboutContent} />
        <CompetenciesSection competencies={competencies} />
        <ProjectsSection projects={projects} />
        <ArticlesSection articles={articles} />
        <CertificatesSection certificates={certificates} />
        <ContactSection options={contactOptions} />
      </MainContent>
      <Footer text={footerText} />
    </PageWrapper>
  );
}
