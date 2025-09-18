"use client";
import styled from "styled-components";
import useSWR from "swr";
import type { CertificateItem, CertificatesResponse } from "@/utils/types";

const Wrap = styled.section.attrs({
  id: "certificates",
  tabIndex: -1,
  "aria-labelledby": "certificates-heading",
})`
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const Title = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing(2)} 0;
  font-weight: 700;
`;

const Status = styled.p`
  margin: ${({ theme }) => theme.spacing(2)} 0 0;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
`;

const Rail = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 999px;
  }
`;

const Card = styled.article`
  min-width: 260px;
  max-width: 300px;
  flex: 0 0 auto;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 16px;
  scroll-snap-align: start;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  }
`;

const Badge = styled.img`
  width: 100%;
  height: 130px;
  object-fit: contain;
  margin-bottom: 12px;
`;

const TitleText = styled.div`
  font-weight: 600;
`;

const OrgText = styled.div`
  opacity: 0.8;
  font-size: 14px;
`;

const IssueDateText = styled.div`
  opacity: 0.6;
  font-size: 12px;
`;

const VerifyLink = styled.a`
  display: inline-block;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.accent};
`;

const TagList = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled.span`
  font-size: 10px;
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const fetcher = (url: string) =>
  fetch(url).then(
    (response) => response.json() as Promise<CertificatesResponse>
  );

export default function CertificatesCarousel() {
  const { data, error, isLoading } = useSWR<CertificatesResponse>(
    "/api/certificates",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const items = data?.items ?? [];

  let content: React.ReactNode = null;

  if (isLoading) {
    content = <Status>Carregando certificados...</Status>;
  } else if (error) {
    content = <Status>Erro ao carregar certificados.</Status>;
  } else if (items.length === 0) {
    content = <Status>Nenhum certificado cadastrado.</Status>;
  } else {
    content = (
      <Rail aria-label="Carrossel de certificados">
        {items.map((certificate: CertificateItem) => {
          const issueDate = new Date(certificate.issueDate).toLocaleDateString(
            "pt-BR"
          );

          return (
            <Card
              key={certificate.id}
              aria-label={`Certificado: ${certificate.title}`}
            >
              <Badge
                src={certificate.imageUrl}
                alt={`Badge ${certificate.title}`}
                loading="lazy"
              />
              <TitleText>{certificate.title}</TitleText>
              <OrgText>{certificate.org}</OrgText>
              <IssueDateText>Emitido em {issueDate}</IssueDateText>
              {certificate.verifyUrl && (
                <VerifyLink
                  href={certificate.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Verificar
                </VerifyLink>
              )}
              {certificate.tags && certificate.tags.length > 0 && (
                <TagList>
                  {certificate.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </TagList>
              )}
            </Card>
          );
        })}
      </Rail>
    );
  }

  return (
    <Wrap>
      <Title id="certificates-heading">Certificados</Title>
      {content}
    </Wrap>
  );
}
