# 📋 AUDITORIA DE CÓDIGO - PORTFÓLIO

**Data:** 14 de novembro de 2025  
**Tamanho atual do build:** 157.79 MB (99 arquivos)

---

## 🎯 OBJETIVO

Otimizar o código, reduzir o tamanho do projeto e melhorar a performance sem comprometer design e funcionalidades.

---

## 🔍 ANÁLISE GERAL

### ✅ Pontos Positivos

1. **Estrutura bem organizada** - Separação clara de responsabilidades
2. **TypeScript** - Tipagem forte implementada
3. **Next.js 15** - Framework moderno e otimizado
4. **Styled Components** - CSS-in-JS com boa performance
5. **Code Splitting** - Componentes client-side bem isolados

### ⚠️ Problemas Identificados

#### 🔴 CRÍTICO - Imagens de Certificados

**Problema:** 14 imagens JPG/PNG importadas diretamente no código
**Impacto:** ~120-140 MB do bundle
**Localização:** `src/app/(site)/mock/certificates.ts`

```typescript
// ❌ PROBLEMA - 14 imports de imagens pesadas
import MicrosoftFundamentals from "/public/assets/certificates/...";
import AnalistaCloud from "/public/assets/certificates/...";
// ... 12 outras imagens
```

#### 🟡 MÉDIO - Dependencies Desnecessárias

1. **critters (0.0.25)** - Não está sendo usado explicitamente
2. **dotenv (17.2.2)** - Next.js tem suporte nativo a .env
3. **html-dom-parser (5.1.1)** - Duplicado com html-react-parser
4. **zod (4.1.9)** - Instalado mas não usado no código visível

#### 🟡 MÉDIO - Hooks Não Utilizados

1. **useProgressiveLoading.ts** - Criado mas não usado
2. **hydration-example.ts** - Apenas exemplo
3. **useIsomorphicLayoutEffect.ts** - Não usado

#### 🟡 MÉDIO - Código Duplicado

1. **Home.tsx** e **page.tsx** - Ambos exportam a mesma página
2. Lógica de fetch repetida em 4 data-fetchers (projects, articles, competencies, certificates)
3. Styled components com estilos similares em múltiplos arquivos

#### 🟢 BAIXO - Otimizações de Performance

1. **GlobalStyle** - Pode ser extraído para arquivo CSS estático
2. **Theme** - Muito simples, pode usar CSS variables
3. **Navigation** - Componente muito grande (400+ linhas)
4. **Estados locais** - Pode usar SWR para cache automático

---

## 🚀 PLANO DE OTIMIZAÇÃO

### 1️⃣ FASE 1: IMAGENS (REDUÇÃO DE ~130 MB)

#### A. Mover certificados para CDN ou otimizar

```typescript
// ✅ SOLUÇÃO 1: URLs externas (Azure Blob Storage / Vercel Blob)
export const certificates: Certificate[] = [
  {
    id: "1",
    title: "Microsoft Fundamentals",
    issuer: "Microsoft",
    imageUrl:
      "https://seucdn.blob.core.windows.net/certificates/microsoft-fundamentals.webp",
    // ...
  },
];
```

#### B. Compressão e conversão para WebP

```bash
# Converter todas as imagens para WebP com 80% de qualidade
Get-ChildItem public/assets/certificates/*.jpg | ForEach-Object {
  $output = $_.FullName -replace ".jpg", ".webp"
  # Usar ferramenta de conversão (ImageMagick, Sharp, Squoosh)
}
```

**Estimativa:** Redução de 130 MB para 10-15 MB

---

### 2️⃣ FASE 2: DEPENDÊNCIAS (REDUÇÃO DE ~5 MB)

#### Remover pacotes desnecessários

```json
// package.json - REMOVER:
{
  "dependencies": {
    // ❌ "critters": "^0.0.25",
    // ❌ "dotenv": "^17.2.2",
    // ❌ "html-dom-parser": "^5.1.1",
    // ❌ "zod": "^4.1.9"
  }
}
```

#### Substituir por alternativas mais leves

```json
// Se precisar de validação:
{
  "dependencies": {
    // ✅ Usar apenas typescript built-in types
    // Ou adicionar apenas quando necessário
  }
}
```

**Comando:**

```bash
npm uninstall critters dotenv html-dom-parser zod
npm run build
```

**Estimativa:** Redução de 3-5 MB

---

### 3️⃣ FASE 3: REFATORAÇÃO DE CÓDIGO

#### A. Unificar Data Fetchers

```typescript
// ✅ src/lib/data-fetchers/index.ts
async function fetchData<T>(
  endpoint: string,
  mockData: T[],
  revalidate = 3600
): Promise<T[]> {
  if (process.env.NODE_ENV === "development") {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData), 300);
    });
  }

  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/${endpoint}`, {
      next: { revalidate },
    });

    if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);

    const data = await res.json();
    return data.items.length > 0 ? data.items : mockData;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return mockData;
  }
}

export const getProjects = () => fetchData("projects", mockProjects);
export const getArticles = () => fetchData("articles", mockArticles);
// ... etc
```

#### B. Simplificar Navigation (dividir em hooks)

```typescript
// src/app/(site)/components/Navigation/useNavigationScroll.ts
export function useNavigationScroll(threshold = 20) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}
```

#### C. Remover arquivos não utilizados

```bash
# Deletar:
# - src/hooks/useProgressiveLoading.ts
# - src/hooks/hydration-example.ts
# - src/hooks/useIsomorphicLayoutEffect.ts (se não usado)
# - src/app/(site)/Home.tsx (manter apenas page.tsx)
```

**Estimativa:** Redução de 2-3 MB, melhor manutenibilidade

---

### 4️⃣ FASE 4: CSS E PERFORMANCE

#### A. Substituir Styled Components por CSS Modules (Opcional)

```css
/* styles/theme.css */
:root {
  --color-bg: #0b0f1a;
  --color-card: #141b2d;
  --color-text: #e5e7eb;
  --color-text-secondary: #9ca3af;
  --color-accent: #60a5fa;
  --color-border: #1f2937;
  --radius: 16px;
}
```

**Vantagens:**

- CSS estático (sem runtime)
- Melhor performance inicial
- Menor bundle size

**Desvantagens:**

- Perde tipagem do theme
- Precisa refatorar todos os componentes

**Decisão:** Manter Styled Components por enquanto (tipagem vale a pena)

#### B. Otimizar GlobalStyle

```typescript
// Extrair fontes para _document ou usar next/font
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
```

#### C. Implementar Dynamic Imports

```typescript
// src/app/(site)/page.tsx
import dynamic from "next/dynamic";

const ArticlesSection = dynamic(() => import("./components/ArticlesSection"), {
  loading: () => <ArticlesSkeleton />,
});

const CertificatesSection = dynamic(
  () => import("./components/CertificatesSection"),
  {
    loading: () => <CertificatesSkeleton />,
  }
);
```

**Estimativa:** Melhoria de 20-30% no First Load JS

---

### 5️⃣ FASE 5: CONFIGURAÇÃO NEXT.JS

#### Melhorar next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: process.env.NODE_ENV === "development",
      fileName: false, // ✅ Desabilitar em produção
    },
    removeConsole: process.env.NODE_ENV === "production", // ✅ Remover logs
  },

  images: {
    formats: ["image/webp", "image/avif"], // ✅ Formatos modernos
    deviceSizes: [640, 750, 828, 1080, 1200], // ✅ Otimizar tamanhos
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      // Adicionar CDN de certificados se usar
    ],
  },

  // ✅ Otimizações de build
  swcMinify: true,
  reactStrictMode: true,

  // ✅ Apenas páginas necessárias
  experimental: {
    optimizePackageImports: ["lucide-react", "styled-components"],
  },
};

export default nextConfig;
```

---

## 📊 RESUMO DE IMPACTO

| Otimização                  | Redução Estimada | Prioridade | Esforço |
| --------------------------- | ---------------- | ---------- | ------- |
| **Otimizar Imagens**        | 120-130 MB       | 🔴 CRÍTICA | Alto    |
| **Remover Dependencies**    | 3-5 MB           | 🟡 ALTA    | Baixo   |
| **Refatorar Data Fetchers** | 1-2 MB           | 🟡 MÉDIA   | Médio   |
| **Dynamic Imports**         | 10-15% FCP       | 🟡 MÉDIA   | Baixo   |
| **Limpar Hooks não usados** | 0.5 MB           | 🟢 BAIXA   | Baixo   |
| **Otimizar next.config**    | 5-10% build      | 🟡 MÉDIA   | Baixo   |

### Total Estimado

- **Tamanho atual:** 157.79 MB
- **Tamanho após otimizações:** ~20-30 MB
- **Redução:** ~82-85% 🎉

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### Imediato (Ganho Rápido)

- [ ] Converter imagens para WebP/AVIF
- [ ] Remover pacotes não utilizados
- [ ] Implementar Dynamic Imports
- [ ] Otimizar next.config.ts
- [ ] Remover arquivos de hooks não usados

### Curto Prazo

- [ ] Refatorar data fetchers
- [ ] Dividir Navigation em hooks menores
- [ ] Implementar SWR para cache
- [ ] Adicionar análise de bundle (next-bundle-analyzer)

### Médio Prazo (Opcional)

- [ ] Migrar certificados para CDN
- [ ] Considerar CSS Modules/Tailwind
- [ ] Implementar ISR (Incremental Static Regeneration)
- [ ] Adicionar Service Worker para cache

---

## 🎓 RECOMENDAÇÕES ADICIONAIS

### Performance

1. Implementar `loading.tsx` e `error.tsx` no App Router
2. Usar `Suspense` boundaries estrategicamente
3. Adicionar métricas Web Vitals (LCP, FID, CLS)
4. Implementar lazy loading de imagens

### SEO

1. Adicionar metadata dinâmica por seção
2. Implementar sitemap.xml
3. Adicionar robots.txt
4. Schema.org markup para projetos/artigos

### Monitoramento

1. Configurar Analytics (Google Analytics 4 ou similar)
2. Implementar error tracking (Sentry)
3. Adicionar performance monitoring
4. Configurar Lighthouse CI

---

## 🚨 AVISOS IMPORTANTES

1. **Backup antes de iniciar:** Commit no Git antes das mudanças
2. **Testar cada fase:** Validar funcionalidades após cada otimização
3. **Não otimizar prematuramente:** Focar nas otimizações com maior impacto primeiro
4. **Medir sempre:** Usar Lighthouse e Web Vitals para validar melhorias

---

## 📝 CONCLUSÃO

O projeto está bem estruturado, mas o principal problema é o **tamanho das imagens de certificados**.

**Prioridade 1:** Otimizar imagens (WebP + compressão ou CDN)  
**Prioridade 2:** Limpar dependências não utilizadas  
**Prioridade 3:** Refatorar código duplicado

Seguindo este plano, é possível reduzir o tamanho do projeto de **157 MB para ~25 MB** (redução de 85%) mantendo todas as funcionalidades e o design atual.
