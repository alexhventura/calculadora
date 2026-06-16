# Calculadora de Juros Compostos

Plataforma de ferramentas financeiras gratuitas: juros compostos, CLT vs PJ, aposentadoria, rescisão e conversor de moedas.

## Requisitos

- Node.js 18+

## Comandos

```bash
npm install
npm run dev      # desenvolvimento em http://localhost:3000
npm run build    # build de produção em dist/
npm run preview  # preview do build
npm test         # testes unitários
```

## Hospedagem

O projeto é **100% estático** após o build. Publique a pasta `dist/` em qualquer hospedagem gratuita (GitHub Pages, Cloudflare Pages, Netlify, Vercel).

Headers de segurança estão em `public/_headers` (compatível com Netlify/Cloudflare).

## Custo operacional

Zero. Sem APIs pagas, sem banco de dados, sem backend obrigatório. Cotações usam APIs públicas gratuitas (BCB, AwesomeAPI) com fallback local.
