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
  background: #0f111a;
`;

const AboutTitle = styled.h2`
  margin: 0;
  text-align: center;
  font-size: 35px;
  color: ${({ theme }) => theme.colors.text};
`;

const AboutCard = styled.article`
  background: #161b22;
  border-radius: 16px;
  padding: 1.75rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
  transition: transform 0.25s ease, box-shadow 0.25s ease,
    border-color 0.25s ease;
  border: 1px solid rgba(255, 255, 255, 0.06);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 24px rgba(0, 173, 181, 0.35);
    border-color: rgba(0, 173, 181, 0.35);
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
