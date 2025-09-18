/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styled from "styled-components";
import { hexToRgba } from "@/utils/color";
import type { ArticleSummary } from "../types";

type ArticlesSectionProps = {
  articles: ArticleSummary[];
  isLoading: boolean;
  error: string;
};

const ArticlesSectionRoot = styled.section.attrs({
  id: "articles",
  tabIndex: -1,
  "aria-labelledby": "articles-heading",
})`
  padding: 96px 0;
`;

const ArticlesContainer = styled.div`
  max-width: 1120px;
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

const StatusMessage = styled.p<{ $variant?: "error" }>`
  margin: ${({ theme }) => theme.spacing(2)} 0 0;
  text-align: center;
  color: ${({ theme, $variant }) =>
    $variant === "error" ? "#f87171" : hexToRgba(theme.colors.text, 0.65)};
`;

const ArticlesGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

const ArticleCard = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 35px rgba(0, 0, 0, 0.25);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const HeroMedia = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  border-radius: 16px;
  overflow: hidden;
  background: ${({ theme }) => hexToRgba(theme.colors.border, 0.3)};
`;

const HeroImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeroPlaceholder = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.6)};
`;

const ArticleTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ArticleDescription = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.7)};
`;

const ArticleFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.55)};
`;

const ArticleTags = styled.span`
  display: inline-flex;
  gap: 6px;
`;

const ReadMore = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.accent};
`;

export default function ArticlesSection({ articles, isLoading, error }: ArticlesSectionProps) {
  return (
    <ArticlesSectionRoot>
      <ArticlesContainer>
        <SectionTitle id="articles-heading">Artigos</SectionTitle>
        {isLoading && <StatusMessage>Carregando artigos...</StatusMessage>}
        {error && (
          <StatusMessage $variant="error">
            Nao foi possivel carregar os artigos. Verifique sua configuracao do Azure Blob Storage.
          </StatusMessage>
        )}
        {!isLoading && !error && articles.length === 0 && (
          <StatusMessage>Nenhum artigo publicado ainda.</StatusMessage>
        )}
        <ArticlesGrid>
          {articles.map((article) => {
            const publishedLabel = (() => {
              if (!article.publishedAt) {
                return "Sem data";
              }

              const parsed = new Date(article.publishedAt);
              return Number.isNaN(parsed.getTime())
                ? "Sem data"
                : parsed.toLocaleDateString("pt-BR");
            })();

            const topTags = article.tags?.slice(0, 3).join(", ");

            return (
              <ArticleCard key={article.slug} href={`/artigos/${article.slug}`}>
                <HeroMedia>
                  {article.heroImage ? (
                    <HeroImage src={article.heroImage} alt={article.title} />
                  ) : (
                    <HeroPlaceholder>Imagem indisponivel</HeroPlaceholder>
                  )}
                </HeroMedia>
                <ArticleTitle>{article.title}</ArticleTitle>
                {article.description && (
                  <ArticleDescription>{article.description}</ArticleDescription>
                )}
                <ArticleFooter>
                  <span>{publishedLabel}</span>
                  {topTags && <ArticleTags>{topTags}</ArticleTags>}
                </ArticleFooter>
                <ReadMore>
                  Ler artigo <span aria-hidden="true">-&gt;</span>
                </ReadMore>
              </ArticleCard>
            );
          })}
        </ArticlesGrid>
      </ArticlesContainer>
    </ArticlesSectionRoot>
  );
}

