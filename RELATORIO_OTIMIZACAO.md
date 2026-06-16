# Relatório de Otimização — calculojuroscompostos.com

**Data:** 15/06/2026  
**Escopo:** Auditoria completa + otimização profunda preservando design, identidade visual e UX existentes.

---

## ETAPA 1 — AUDITORIA (Estado Inicial)

### Arquitetura

| Aspecto | Estado inicial |
|---------|----------------|
| **Stack** | React 19 + Vite 6 + TypeScript + Tailwind CSS 4 |
| **Padrão** | SPA monolítica — `App.tsx` com ~2.100 linhas |
| **Rotas** | Single-page (sem router); ferramentas via estado `activeTool` |
| **Hospedagem** | Estática (Vite build → `dist/`) |
| **Backend** | Nenhum em uso real (Express/Gemini declarados mas não utilizados) |

### Estrutura de arquivos (antes)

```
src/
  App.tsx              # Monólito (UI + lógica + API + cálculos)
  main.tsx
  index.css
  types.ts
  utils/finance.ts
  components/          # 3 componentes
```

### Ferramentas implementadas

1. Juros Compostos (com gráfico e tabela)
2. CLT vs PJ
3. Previdência & Aposentadoria
4. Rescisão Trabalhista
5. Conversor de Moedas (matriz global)

### Gargalos identificados

| Categoria | Problema |
|-----------|----------|
| **Performance** | Bundle único; sem code splitting; fontes Google sem preconnect; peso 300/400/800 desnecessário |
| **SEO** | `lang="en"`; sem meta description; sem OG/Twitter; sem canonical; sem sitemap/robots; sem H1; sem Schema.org |
| **Segurança** | Sem CSP/headers; dependências não usadas (@google/genai, express, motion); logs em produção |
| **Acessibilidade** | Sem skip link; modais sem `role="dialog"`; gráfico sem `aria-label` |
| **Escalabilidade** | Toda lógica em um arquivo; impossível adicionar calculadoras sem inflar o monólito |
| **Qualidade** | Zero testes; tipagem `as any` em dados de ferramentas |
| **Custo** | Metadados referenciando Gemini API paga (não usada) |

### Dependências removidas (custo zero reforçado)

- `@google/genai` — IA paga, não utilizada
- `express` + `dotenv` — servidor não existia
- `motion` — animações não utilizadas
- `tsx` — não necessário

---

## ETAPA 2–11 — MELHORIAS IMPLEMENTADAS

### Performance

| Melhoria | Detalhe |
|----------|---------|
| **Code splitting** | `EvolucaoChart` e `TabelaMensal` com `React.lazy()` + `Suspense` |
| **Manual chunks** | `vendor` (react) e `icons` (lucide) separados |
| **Fontes** | Preconnect no HTML; removido peso 300 não usado |
| **Build** | `esbuild` minify, `cssMinify`, target ES2022 |
| **Dead code** | ~90 linhas de fetch inline extraídas; dependências mortas removidas |

### Bundle pós-build (produção)

| Chunk | Tamanho | Gzip |
|-------|---------|------|
| `index.js` | 264 KB | 76 KB |
| `icons.js` | 17 KB | 5 KB |
| `EvolucaoChart.js` | 9 KB | 3 KB |
| `TabelaMensal.js` | 7 KB | 2 KB |
| `vendor.js` | 4 KB | 2 KB |
| `index.css` | 39 KB | 8 KB |

**Ganho estimado:** LCP melhorado por carregamento diferido do gráfico/tabela (~16 KB gzip adiados até interação na ferramenta de juros).

### SEO Técnico

- `index.html`: `lang="pt-BR"`, meta description, keywords, canonical, OG, Twitter Card, theme-color
- `public/robots.txt` e `public/sitemap.xml`
- `public/favicon.svg`
- H1 semântico (`sr-only`) + hierarquia preservada visualmente
- JSON-LD: `WebSite`, `Organization`, `WebApplication`, `FAQPage`, `BreadcrumbList`

### Segurança

- Headers em `vite.config.ts` (dev/preview) e `public/_headers` (produção estática)
- CSP preparado para AdSense futuro (domínios Google Ads na allowlist)
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`
- Sanitização em `utils/format.ts` (`sanitizeNumericString`, `clampNumber`)
- Logs de API apenas em `import.meta.env.DEV`

### Acessibilidade (WCAG AA)

- Skip link para `#conteudo-principal`
- `role="banner"`, `role="main"`, `role="contentinfo"`, `role="complementary"` (ads)
- Modais: `role="dialog"`, `aria-modal`, `aria-labelledby`
- Gráfico e tabela com `aria-label`
- Status de cotações com `aria-live="polite"`

### UX (sem alterar visual)

- Error Boundary global com recuperação via reload
- Fallback visual (skeleton) durante lazy load do gráfico
- Estados de erro tratados silenciosamente em produção

### AdSense (preparação — sem anúncios inseridos)

- `AnuncioSlot` com dimensões fixas (`minHeight`) anti-CLS
- `data-ad-slot` e `data-ad-format` para integração futura
- CSP já permite domínios Google Ads
- Slots existentes preservados: 728×90, 300×250, horizontal-flexible

### Escalabilidade — Nova estrutura

```
src/
  constants/site.ts           # Configuração central do site
  hooks/useEconomicRates.ts   # API pública BCB + AwesomeAPI
  utils/
    format.ts                 # Máscaras e sanitização
    finance.ts                # Juros compostos (inalterado visualmente)
    calculations/
      tax.ts                  # INSS / IRRF
      toolCalculations.ts     # Lógica das 4 ferramentas
  components/
    ErrorBoundary.tsx
    layout/SkipLink.tsx
    seo/JsonLd.tsx
    AnuncioSlot.tsx           # Melhorado
    EvolucaoChart.tsx         # A11y
    TabelaMensal.tsx          # A11y
public/
  robots.txt, sitemap.xml, _headers, favicon.svg
```

**Para adicionar nova calculadora:**
1. Criar lógica em `utils/calculations/`
2. Adicionar case em `toolCalculations.ts`
3. Adicionar botão no bento selector em `App.tsx`
4. Adicionar formulário/resultado na seção correspondente

### Testes (18 passando)

```bash
npm test
# ✓ finance.test.ts (10)
# ✓ calculations.test.ts (8)
```

Cobertura: juros compostos, conversão de moedas, INSS/IRRF, formatação pt-BR, rescisão, sanitização de inputs.

---

## ETAPA 12 — MÉTRICAS E GANHOS

### Antes vs Depois (estimativa Lighthouse)

| Métrica | Antes (est.) | Depois (est.) | Nota |
|---------|--------------|---------------|------|
| Performance | 75–85 | 90–98 | Code split + fontes otimizadas |
| Accessibility | 80–88 | 92–98 | Skip link, ARIA, semântica |
| Best Practices | 80–90 | 95–100 | Headers, sem deps vulneráveis não usadas |
| SEO | 60–75 | 95–100 | Meta, schema, sitemap, H1 |
| Bundle JS inicial | ~290 KB | ~264 KB + chunks lazy | Menor TTI na primeira pintura |

> Execute `npm run build && npm run preview` e rode Lighthouse no Chrome DevTools para métricas exatas do seu ambiente.

### Funcionalidades preservadas

- Design bordô (#800020), layout bento, header sticky, painel de cotações
- Todas as 4 calculadoras + conversor de moedas
- Gráfico SVG interativo, tabela paginada, export CSV
- Modais institucionais (termos, privacidade, manual)
- Slots de anúncio (placeholders visuais)
- APIs gratuitas BCB + AwesomeAPI com fallback

### Oportunidades futuras (custo zero)

1. **Router** (ex: `react-router` ou hash routes) para URLs amigáveis por ferramenta (`/juros-compostos`, `/clt-pj`)
2. **PWA** com service worker para offline e cache de assets
3. **Self-host fonts** para eliminar dependência do Google Fonts (ganho de privacidade)
4. **Mais testes E2E** com Playwright (gratuito)
5. **Integração AdSense** quando aprovado — substituir conteúdo de `AnuncioSlot` pelo script `adsbygoogle`
6. **Refatorar App.tsx** em componentes por ferramenta (`JurosCompostosTool.tsx`, etc.) — próximo passo de escalabilidade

---

## Comandos de verificação

```bash
npm install
npm test          # 18 testes
npm run build     # build de produção
npm run preview   # servir dist/ localmente
```

---

## Conclusão

O projeto evoluiu de um protótipo AI Studio monolítico para uma **plataforma estática profissional**, mantendo integralmente a identidade visual bordô e o layout existente. Custo operacional permanece **zero**: sem APIs pagas, sem backend, hospedagem estática gratuita, bibliotecas open source.
