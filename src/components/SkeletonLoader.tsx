"use client";

import styled, { keyframes } from "styled-components";
import { hexToRgba } from "@/utils/color";

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonBase = styled.div`
  background: ${({ theme }) => hexToRgba(theme.colors.card, 0.3)};
  background-image: linear-gradient(
    90deg,
    ${({ theme }) => hexToRgba(theme.colors.card, 0.3)} 0px,
    ${({ theme }) => hexToRgba(theme.colors.border, 0.5)} 40px,
    ${({ theme }) => hexToRgba(theme.colors.card, 0.3)} 80px
  );
  background-size: 200px;
  animation: ${shimmer} 1.2s ease-in-out infinite;
  border-radius: 8px;
`;

export const SkeletonBox = styled(SkeletonBase)<{
  width?: string;
  height?: string;
}>`
  width: ${({ width = "100%" }) => width};
  height: ${({ height = "20px" }) => height};
`;

export const SkeletonCard = styled(SkeletonBase)`
  width: 100%;
  height: 200px;
  border-radius: 16px;
`;

export const SkeletonSection = styled.section`
  padding: 72px 0;
  background: ${({ theme }) => theme.colors.bg};
`;

export const SkeletonContainer = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  gap: 24px;
`;

export const SkeletonGrid = styled.div<{ columns?: number }>`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  @media (min-width: 768px) {
    grid-template-columns: repeat(${({ columns = 2 }) => columns}, 1fr);
  }
`;

// Componentes específicos
export function ProjectsSkeleton() {
  return (
    <SkeletonSection>
      <SkeletonContainer>
        <SkeletonBox height="32px" width="200px" />
        <SkeletonGrid columns={3}>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </SkeletonGrid>
      </SkeletonContainer>
    </SkeletonSection>
  );
}

export function ArticlesSkeleton() {
  return (
    <SkeletonSection>
      <SkeletonContainer>
        <SkeletonBox height="32px" width="150px" />
        <SkeletonBox height="40px" width="300px" />
        <SkeletonGrid columns={3}>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </SkeletonGrid>
      </SkeletonContainer>
    </SkeletonSection>
  );
}

export function CertificatesSkeleton() {
  return (
    <SkeletonSection>
      <SkeletonContainer>
        <SkeletonBox height="32px" width="180px" />
        <SkeletonBox height="40px" width="250px" />
        <SkeletonGrid columns={4}>
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </SkeletonGrid>
      </SkeletonContainer>
    </SkeletonSection>
  );
}

export function CompetenciesSkeleton() {
  return (
    <SkeletonSection>
      <SkeletonContainer>
        <SkeletonBox height="32px" width="220px" />
        <SkeletonBox height="40px" width="400px" />
        <SkeletonGrid columns={2}>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </SkeletonGrid>
      </SkeletonContainer>
    </SkeletonSection>
  );
}
