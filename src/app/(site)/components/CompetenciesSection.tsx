"use client";

import { useMemo, useState } from "react";
import styled from "styled-components";
import type {
  CompetencyTabsContent,
  CompetencyTab,
  CompetencySubTab,
  CompetencyCard,
} from "../types";
import {
  Cloud,
  Code2,
  Cpu,
  Cog,
  BadgeHelp,
  ShieldCheck,
  Server,
  Database,
  Boxes,
  Layers,
  GitBranch,
  MonitorSmartphone,
} from "lucide-react";

/* =============== Styles (abas + cards) =============== */
const Wrapper = styled.section`
  padding: 3rem 1rem;
  color: #eaeaea;
  background: #0f111a;
`;

const Title = styled.h2`
  text-align: center;
  font-size: clamp(1.8rem, 2vw + 1rem, 2.4rem);
  margin-bottom: 1.75rem;
  letter-spacing: 0.5px;
`;

const TabsBar = styled.div`
  max-width: 1100px;
  margin: 0 auto 1rem auto;
  display: flex;
  gap: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  overflow-x: auto;
  padding-bottom: 0.5rem;
`;

const TabBtn = styled.button<{ $active?: boolean }>`
  appearance: none;
  background: ${({ $active }) =>
    $active ? "rgba(0,173,181,.12)" : "transparent"};
  color: ${({ $active }) => ($active ? "#c7fbff" : "#b9c6d2")};
  border: 1px solid
    ${({ $active }) => ($active ? "rgba(0,173,181,.45)" : "transparent")};
  padding: 0.5rem 0.9rem;
  border-radius: 9px;
  font-weight: 600;
  letter-spacing: 0.2px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: rgba(122, 216, 221, 0.08);
  }
`;

const SubTabsBar = styled.div`
  max-width: 1100px;
  margin: 0.25rem auto 1.25rem auto;
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
`;

const SubTabBtn = styled.button<{ $active?: boolean }>`
  appearance: none;
  background: ${({ $active }) =>
    $active ? "rgba(122,216,221,.16)" : "rgba(255,255,255,.04)"};
  color: ${({ $active }) => ($active ? "#d7feff" : "#cfd8df")};
  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(122,216,221,.45)" : "rgba(255,255,255,.06)"};
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: 0.2s ease;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
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

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  h3 {
    margin: 0;
    font-size: 1.25rem;
    color: #e6f7f8;
    letter-spacing: 0.3px;
  }
  .icon {
    background: radial-gradient(
      120% 120% at 30% 30%,
      rgba(0, 173, 181, 0.35),
      transparent 60%
    );
    border: 1px solid rgba(0, 173, 181, 0.35);
    border-radius: 12px;
    padding: 0.5rem;
    display: grid;
    place-items: center;
  }
  svg {
    color: #00adb5;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 1rem 0;
  display: grid;
  gap: 0.6rem;
`;
const Item = styled.li`
  display: grid;
  grid-template-columns: 20px 1fr;
  align-items: start;
  gap: 0.6rem;
  line-height: 1.5;
  svg {
    margin-top: 2px;
    opacity: 0.9;
    color: #7ad8dd;
  }
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;
const Chip = styled.span`
  font-size: 0.8rem;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  border: 1px solid rgba(122, 216, 221, 0.25);
  background: rgba(122, 216, 221, 0.08);
  color: #bfeff1;
  letter-spacing: 0.2px;
`;

/* =============== Icon helpers =============== */
const tabIcon = (key: string) => {
  if (key === "cloud") return <Cloud size={16} />;
  if (key === "devops") return <Cog size={16} />;
  if (key === "prog") return <Code2 size={16} />;
  if (key === "ia") return <Cpu size={16} />;
  return <BadgeHelp size={16} />;
};

const headingIconByTitle = (t: string) => {
  const k = t.toLowerCase();
  if (k.includes("cloud")) return <Cloud size={22} />;
  if (k.includes("full") || k.includes("stack") || k.includes("desenv"))
    return <Code2 size={22} />;
  return <BadgeHelp size={22} />;
};

const itemIconByText = (txt: string) => {
  const t = txt.toLowerCase();
  if (t.includes("azure") || t.includes("seguran"))
    return <ShieldCheck size={18} />;
  if (t.includes("api") || t.includes("back")) return <Server size={18} />;
  if (t.includes("gover") || t.includes("identid")) return <Boxes size={18} />;
  if (t.includes("monitor") || t.includes("backup") || t.includes("banco"))
    return <Database size={18} />;
  if (t.includes("git")) return <GitBranch size={18} />;
  if (t.includes("respons") || t.includes("ui") || t.includes("design"))
    return <Layers size={18} />;
  if (t.includes("front") || t.includes("react") || t.includes("next"))
    return <MonitorSmartphone size={18} />;
  return <ShieldCheck size={18} />;
};

/* =============== Component =============== */
export default function CompetenciesTabbedSection({
  content,
}: {
  content: CompetencyTabsContent;
}) {
  const [activeTab, setActiveTab] = useState(content.tabs[0]?.key ?? "");
  const activeTabData: CompetencyTab | undefined = useMemo(
    () => content.tabs.find((t) => t.key === activeTab),
    [content.tabs, activeTab]
  );

  const [activeSub, setActiveSub] = useState(
    activeTabData?.subTabs[0]?.key ?? ""
  );

  // quando muda a aba principal, resetar a sub-aba
  const subTabs: CompetencySubTab[] =
    activeTabData?.subTabs ?? useMemo(() => [], [activeTabData]);
  useMemo(() => {
    if (subTabs.length && !subTabs.find((s) => s.key === activeSub)) {
      setActiveSub(subTabs[0].key);
    }
  }, [subTabs, activeSub]);

  const currentSub = subTabs.find((s) => s.key === activeSub);

  return (
    <Wrapper>
      <Title>{content.titulo}</Title>

      {/* Top Tabs */}
      <TabsBar>
        {content.tabs.map((t) => (
          <TabBtn
            key={t.key}
            $active={t.key === activeTab}
            onClick={() => setActiveTab(t.key)}
            aria-pressed={t.key === activeTab}
          >
            <span
              style={{ display: "inline-flex", gap: 6, alignItems: "center" }}
            >
              {tabIcon(t.key)} {t.label}
            </span>
          </TabBtn>
        ))}
      </TabsBar>

      {/* Sub Tabs */}
      {subTabs.length > 1 && (
        <SubTabsBar>
          {subTabs.map((s) => (
            <SubTabBtn
              key={s.key}
              $active={s.key === activeSub}
              onClick={() => setActiveSub(s.key)}
              aria-pressed={s.key === activeSub}
            >
              {s.label}
            </SubTabBtn>
          ))}
        </SubTabsBar>
      )}

      {/* Cards */}
      <Grid>
        {(currentSub?.cards ?? []).map((card: CompetencyCard) => (
          <Card key={card.titulo}>
            <Header>
              <div className="icon">{headingIconByTitle(card.titulo)}</div>
              <h3>{card.titulo}</h3>
            </Header>

            <List>
              {card.itens.map((it) => (
                <Item key={it}>
                  {itemIconByText(it)} {it}
                </Item>
              ))}
            </List>

            {card.chips?.length ? (
              <Chips>
                {card.chips.map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </Chips>
            ) : null}
          </Card>
        ))}
      </Grid>
    </Wrapper>
  );
}



