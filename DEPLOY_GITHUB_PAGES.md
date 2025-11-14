# 🚀 Deploy para GitHub Pages

## 📋 Configurações Realizadas

### ✅ Next.js Configurado para Export Estático

O projeto foi configurado para gerar um site estático compatível com GitHub Pages:

- ✅ `output: "export"` habilitado quando `BUILD_MODE=export`
- ✅ Imagens desotimizadas para compatibilidade estática
- ✅ Rotas API configuradas com `dynamic = "force-static"`
- ✅ Data fetchers usando dados mock em modo export
- ✅ Arquivo `.nojekyll` para evitar processamento Jekyll

### 📦 Estrutura de Build

```
out/                    # Pasta gerada com site estático
├── _next/             # Assets do Next.js
├── api/               # Rotas API (estáticas)
├── assets/            # Imagens e recursos
├── index.html         # Página principal
├── 404.html           # Página de erro
└── .nojekyll          # Previne Jekyll
```

---

## 🎯 Como Fazer Deploy

### Método 1: GitHub Actions (Automático) ⭐ RECOMENDADO

O deploy é feito automaticamente quando você faz push para `main`.

**Workflow configurado:** `.github/workflows/deploy.yml`

**Passo a passo:**

1. **Faça commit e push das suas mudanças:**

   ```bash
   git add .
   git commit -m "feat: adicionando nova funcionalidade"
   git push origin main
   ```

2. **O GitHub Actions vai:**

   - ✅ Instalar dependências
   - ✅ Fazer build estático (`npm run build:export`)
   - ✅ Fazer deploy para GitHub Pages automaticamente

3. **Acompanhe o deploy:**

   - Vá para: https://github.com/luizjrlopes/portifolioNovo/actions
   - Clique no último workflow "Deploy to GitHub Pages"

4. **Acesse seu site:**
   - URL: https://luizjrlopes.github.io/portifolioNovo/
   - Ou seu domínio customizado se configurado

---

### Método 2: Build Local + Push Manual

Se preferir fazer o deploy manualmente:

```powershell
# 1. Fazer build local
npm run build:export

# 2. A pasta out/ será gerada com o site estático
# 3. O GitHub Actions fará o deploy automático no próximo push
```

---

## ⚙️ Configuração do Repositório

### Habilitar GitHub Pages

1. Acesse: https://github.com/luizjrlopes/portifolioNovo/settings/pages

2. Configure:

   - **Source:** GitHub Actions
   - **Build and deployment:** GitHub Actions

3. Salve as configurações

---

## 🔧 Variáveis de Ambiente

### Para Deploy Estático

Quando `BUILD_MODE=export`:

- ✅ Data fetchers usam dados mock (não fazem requisições API)
- ✅ Imagens não são otimizadas (unoptimized: true)
- ✅ Site funciona 100% estático

### Para Desenvolvimento Local

```bash
npm run dev
```

- Usa dados mock com delay simulado
- Servidor Next.js com hot reload
- APIs disponíveis em http://localhost:3000/api/\*

---

## 📝 Scripts Disponíveis

```json
{
  "dev": "next dev", // Desenvolvimento local
  "build": "next build", // Build para produção (SSR)
  "build:export": "cross-env BUILD_MODE=export ...", // Build estático (GitHub Pages)
  "start": "next start", // Servidor de produção
  "deploy": "npm run build:export" // Alias para build estático
}
```

---

## 🌐 URLs

### Desenvolvimento

```
http://localhost:3000
```

### Produção (GitHub Pages)

```
https://luizjrlopes.github.io/portifolioNovo/
```

### Customizar URL

Se quiser usar domínio customizado ou username.github.io:

1. **Edite `next.config.ts`:**

   ```typescript
   const repoName = ""; // Deixe vazio para domínio customizado
   ```

2. **Configure CNAME (se usar domínio customizado):**
   - Crie arquivo `public/CNAME` com seu domínio
   - Configure DNS do seu domínio

---

## 🐛 Troubleshooting

### Build falhando?

```bash
# Limpe cache e tente novamente
Remove-Item -Recurse -Force .next, out
npm run build:export
```

### GitHub Actions falhando?

1. Verifique se GitHub Pages está habilitado
2. Verifique se "Read and write permissions" está habilitado em:
   - Settings > Actions > General > Workflow permissions

3. Se a página publicada mostra o conteúdo do README (texto "Getting Started" do Next), o Pages está servindo a branch em vez do artefato do Actions:
   - Vá em Settings > Pages > Build and deployment > Source e selecione "GitHub Actions".
   - Reexecute o workflow mais recente (Actions > Deploy to GitHub Pages > Re-run) ou faça um novo push.

### Site não carregando assets?

- Verifique se `basePath` em `next.config.ts` está correto
- Para `username.github.io/repo-name/`, use `basePath: "/repo-name"`
- Para domínio customizado ou `username.github.io`, use `basePath: ""`

---

## ✅ Checklist de Deploy

- [ ] Código commitado e sem erros
- [ ] `npm run build:export` funcionando localmente
- [ ] GitHub Pages habilitado no repositório
- [ ] Workflow permissions configuradas
- [ ] Push para branch `main`
- [ ] Aguardar GitHub Actions concluir
- [ ] Acessar URL e testar funcionalidades

---

## 📚 Recursos

- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages](https://docs.github.com/en/pages)
- [GitHub Actions](https://docs.github.com/en/actions)

---

**Última atualização:** 14 de novembro de 2025  
**Status:** ✅ Configurado e pronto para deploy
