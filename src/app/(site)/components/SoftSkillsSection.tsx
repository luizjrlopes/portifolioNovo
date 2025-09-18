"use client";

import {
  MessageCircle,
  Settings,
  Repeat,
  Users,
  BadgeInfo,
} from "lucide-react";
import styled from "styled-components";
import type { SoftSkillsContent } from "../types";

// =========== styles ===========
const Section = styled.section`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: stretch;
  color: #eaeaea;
  padding: 3rem;
  background: #0f111a;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const Card = styled.div`
  flex: 1;
  background: #161b22;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 20px rgba(0, 173, 181, 0.6);
  }
  h3 {
    margin-bottom: 1rem;
    color: #00adb5;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }
  svg {
    flex-shrink: 0;
    color: #00adb5;
  }
`;

// =========== helpers ===========
const skillIcon = (text: string) => {
  const t = text.toLowerCase();
  if (t.includes("comunica")) return <MessageCircle size={20} />;
  if (t.includes("resolu") || t.includes("problema"))
    return <Settings size={20} />;
  if (t.includes("flex") || t.includes("adapt")) return <Repeat size={20} />;
  if (t.includes("colab") || t.includes("equipe")) return <Users size={20} />;
  return <BadgeInfo size={20} />;
};

// =========== component ===========
export default function SoftSkillsSection({
  content,
}: {
  content: SoftSkillsContent;
}) {
  return (
    <Section>
      {content.blocos.map((bloco: { titulo: string; itens: string[] }) => (
        <Card key={bloco.titulo}>
          <h3>{bloco.titulo}</h3>

          {bloco.itens.length > 1 ? (
            <ul>
              {bloco.itens.map((it) => (
                <li key={it}>
                  {skillIcon(it)} {it}
                </li>
              ))}
            </ul>
          ) : (
            <p>{bloco.itens[0]}</p>
          )}
        </Card>
      ))}
    </Section>
  );
}
