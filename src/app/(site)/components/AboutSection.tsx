/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import { hexToRgba } from "@/utils/color";
import type { AboutContent } from "../types";
import parseContent from "@/utils/parseContent";

type AboutSectionProps = {
  content: AboutContent;
};

const AboutSectionRoot = styled.section.attrs({
  id: "about",
  tabIndex: -1,
  "aria-labelledby": "about-heading",
})`
  padding: 96px 0;
`;

const AboutContainer = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const AboutTitle = styled.h2`
  margin: 0;
  text-align: center;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  color: ${({ theme }) => theme.colors.text};
`;

const AboutCard = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  box-shadow: 0 18px 35px rgba(0, 0, 0, 0.25);

  @media (min-width: 768px) {
    grid-template-columns: 200px 1fr;
    align-items: center;
  }
`;

const Avatar = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const DescriptionBlock = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Paragraph = styled.p`
  margin: 0;
  font-size: 1.0625rem;
  line-height: 1.7;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.8)};
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

export default function AboutSection({ content }: AboutSectionProps) {
  const { imageUrl, description, richDescription } = content;

  const fallbackParagraphs = description
    ? description
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
    : [];

  return (
    <AboutSectionRoot>
      <AboutContainer>
        <AboutTitle id="about-heading">Sobre Mim</AboutTitle>
        <AboutCard>
          <AvatarWrapper>
            <Avatar src={imageUrl} alt="Foto de perfil de Luiz Junior" />
          </AvatarWrapper>
          <DescriptionBlock>
            {richDescription
              ? richDescription
              : fallbackParagraphs.map((paragraph, index) => (
                  <Paragraph key={`${index}-${paragraph.slice(0, 16)}`}>
                    {parseContent(paragraph)}
                  </Paragraph>
                ))}
          </DescriptionBlock>
        </AboutCard>
      </AboutContainer>
    </AboutSectionRoot>
  );
}
