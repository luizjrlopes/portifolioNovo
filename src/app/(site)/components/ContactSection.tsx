import styled from "styled-components";
import { hexToRgba } from "@/utils/color";
import type { ContactOption } from "../types";

type ContactSectionProps = {
  options: ContactOption[];
};

const ContactSectionRoot = styled.section.attrs({
  id: "contact",
  tabIndex: -1,
  "aria-labelledby": "contact-heading",
})`
  padding: 96px 0;
`;

const ContactContainer = styled.div`
  max-width: 880px;
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

const ContactCard = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  text-align: center;
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
  box-shadow: 0 18px 35px rgba(0, 0, 0, 0.25);
`;

const ContactDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.75)};
  font-size: 1rem;
`;

const OptionsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const ContactLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 22px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background: ${({ theme }) => hexToRgba(theme.colors.accent, 0.15)};
    color: ${({ theme }) => theme.colors.accent};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export default function ContactSection({ options }: ContactSectionProps) {
  return (
    <ContactSectionRoot>
      <ContactContainer>
        <SectionTitle id="contact-heading">Contato</SectionTitle>
        <ContactCard>
          <ContactDescription>
            Tem um projeto ou oportunidade? Vamos conversar e transformar ideias em resultados.
          </ContactDescription>
          <OptionsGrid>
            {options.map(({ label, href, display }) => {
              const isExternal = href.startsWith("http");

              return (
                <ContactLink
                  key={label}
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                >
                  {display}
                </ContactLink>
              );
            })}
          </OptionsGrid>
        </ContactCard>
      </ContactContainer>
    </ContactSectionRoot>
  );
}

