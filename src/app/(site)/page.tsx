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
import { navLinks, projects, contactOptions, footerText } from "./mock/content";
import { heroContent } from "./mock/hero";
import { aboutContent } from "./mock/about";
import { competenciesTabsContent } from "./mock/competencies";
import type { ArticleSummary } from "./types";
import { articles } from "./mock/articles";
import { certificateTabs, certificateCategories } from "./mock/certificates";

const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
`;

export default function Home() {
  return (
    <PageWrapper>
      <Navigation links={navLinks} />
      <MainContent>
        <Hero content={heroContent} />
        <AboutSection content={aboutContent} />
        <CompetenciesSection content={competenciesTabsContent} />
        <ProjectsSection projects={projects} />
        <ArticlesSection articles={articles} />
        <CertificatesSection
          tabs={certificateTabs}
          categories={certificateCategories}
        />
        <ContactSection options={contactOptions} />
      </MainContent>
      <Footer text={footerText} />
    </PageWrapper>
  );
}
