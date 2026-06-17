import type { ToolSeoContent } from '../types';
import { ROUTES, toolPath } from '../../constants/routes';
import { SOURCES_BCB } from '../../constants/eeat';

export const jurosCompostosContent: ToolSeoContent = {
  tool: 'juros',
  h1: 'Calculadora de Juros Compostos Online Grátis',
  metaTitle: 'Calculadora de Juros Compostos | Simule Poupança, Selic e CDI',
  metaDescription:
    'Calcule juros compostos com aportes mensais, compare Poupança vs Selic vs CDI, veja gráfico de evolução e exporte CSV. Ferramenta gratuita e educativa.',
  intro:
    'Use nossa calculadora de juros compostos para projetar o crescimento do seu patrimônio ao longo do tempo. Simule valor inicial, aportes mensais, taxa de rendimento e período — e compare automaticamente com Poupança, Selic e CDI com dados atualizados do Banco Central.',
  sections: [
    {
      id: 'o-que-sao',
      title: 'O que são juros compostos?',
      paragraphs: [
        'Juros compostos são o mecanismo pelo qual os rendimentos de um investimento passam a render sobre si mesmos, criando um efeito de crescimento exponencial ao longo do tempo. Diferente dos juros simples — onde o rendimento incide apenas sobre o capital inicial — nos juros compostos cada período de rentabilidade aumenta a base de cálculo do período seguinte.',
        'Esse fenômeno é frequentemente chamado de "efeito bola de neve": no início o crescimento parece lento, mas com consistência nos aportes e uma taxa adequada, o montante acumulado acelera de forma significativa. Grandes investidores como Warren Buffett atribuem grande parte de seu patrimônio ao tempo combinado com juros compostos.',
        'No Brasil, a maioria dos investimentos de renda fixa (CDB, Tesouro Direto, fundos DI) utiliza capitalização composta, geralmente com base diária (252 dias úteis) ou mensal. Nossa calculadora utiliza capitalização mensal, padrão para planejamento financeiro pessoal.',
      ],
    },
    {
      id: 'como-calcular',
      title: 'Como calcular juros compostos',
      paragraphs: [
        'A fórmula clássica dos juros compostos é M = P × (1 + i)^n, onde M é o montante final, P o principal, i a taxa por período e n o número de períodos. Quando há aportes mensais regulares, o cálculo torna-se uma série de pagamentos com capitalização — exatamente o que nossa ferramenta faz mês a mês.',
        'Para usar a calculadora: informe o valor inicial (se houver), o aporte mensal que pretende manter, o período em anos ou meses e a taxa de juros. Você pode digitar uma taxa manual ou selecionar referências de mercado como Poupança, Selic ou CDI, atualizadas via API pública do Banco Central.',
        'A taxa pode ser informada ao ano (% a.a.) ou ao mês (% a.m.). A conversão entre períodos segue a regra composta: i_mensal = (1 + i_anual)^(1/12) − 1. Isso garante que uma taxa de 12% ao ano não seja erroneamente tratada como 1% simples ao mês.',
      ],
      list: [
        'Valor inicial: quanto você já possui investido hoje.',
        'Aporte mensal: quanto pretende investir todo mês de forma recorrente.',
        'Período: horizonte da simulação em anos ou meses.',
        'Taxa: rendimento esperado — manual ou baseado em Poupança, Selic ou CDI.',
      ],
    },
    {
      id: 'exemplos',
      title: 'Exemplos práticos de juros compostos',
      paragraphs: [
        'Exemplo 1 — Aporte sem valor inicial: Maria investe R$ 500 por mês a uma taxa equivalente a 10% ao ano durante 20 anos. Sem juros compostos, ela teria R$ 120.000 investidos. Com capitalização mensal, o montante final supera R$ 380.000 — mais do que o triplo do valor aportado, demonstrando o poder do tempo.',
        'Exemplo 2 — Valor inicial + aportes: João possui R$ 50.000 e aporta R$ 1.000 mensais a 12% ao ano por 15 anos. O gráfico da calculadora mostra como a curva de juros se inclina nos últimos anos, quando os rendimentos sobre o montante acumulado superam os próprios aportes mensais.',
        'Exemplo 3 — Comparação com Poupança: ao selecionar a taxa da Poupança, você vê em tempo real quanto ganharia a mais (ou a menos) em relação à sua taxa personalizada, além da comparação com Selic e CDI — referências do mercado brasileiro de renda fixa.',
      ],
    },
    {
      id: 'simples-vs-compostos',
      title: 'Diferença entre juros simples e compostos',
      paragraphs: [
        'Nos juros simples, o rendimento é sempre calculado sobre o capital original. Se você investe R$ 10.000 a 10% ao ano por 5 anos, recebe R$ 1.000 por ano — totalizando R$ 15.000. A base de cálculo nunca muda.',
        'Nos juros compostos, ao final do primeiro ano você teria R$ 11.000; no segundo, os 10% incidem sobre R$ 11.000 (R$ 1.100), totalizando R$ 12.100 — e assim sucessivamente. Ao final de 5 anos, o montante seria R$ 16.105,10, contra R$ 15.000 nos juros simples.',
        'A diferença cresce dramaticamente com o tempo. Em 30 anos, a distância entre juros simples e compostos pode representar centenas de milhares de reais. Por isso, para investimentos de longo prazo, a capitalização composta é o modelo correto de projeção.',
      ],
    },
    {
      id: 'erros-comuns',
      title: 'Erros comuns ao calcular juros compostos',
      paragraphs: [
        'Confundir taxa mensal com anual é o erro mais frequente. 1% ao mês não equivale a 12% ao ano — na verdade, equivale a aproximadamente 12,68% ao ano pela capitalização composta.',
        'Ignorar a inflação: um rendimento nominal de 10% com inflação de 5% significa ganho real de cerca de 4,76%, não 5%. Nossa calculadora exibe o poder de compra real descontando o IPCA acumulado no período.',
        'Esquecer impostos e taxas: CDBs e fundos têm IR regressivo (22,5% a 15% conforme prazo). Tesouro IPCA+ tem taxa de custódia. Os valores simulados aqui são brutos — use-os como referência educativa, não como valor líquido garantido.',
        'Subestimar o tempo: muitos investidores focam na taxa e ignoram que o tempo é o fator mais poderoso dos juros compostos. Começar cinco anos antes pode valer mais do que buscar 2% a mais de rentabilidade.',
      ],
      list: [
        'Não converter corretamente taxa mensal ↔ anual.',
        'Não considerar inflação no planejamento de longo prazo.',
        'Ignorar tributação e taxas de administração.',
        'Interromper aportes mensais por falta de disciplina.',
        'Comparar investimentos com prazos e riscos diferentes.',
      ],
    },
  ],
  faq: [
    {
      question: 'O que são juros compostos?',
      answer:
        'Juros compostos são rendimentos calculados sobre o capital inicial mais os juros acumulados de períodos anteriores, gerando crescimento exponencial ao longo do tempo.',
    },
    {
      question: 'Como funciona o rendimento mensal na calculadora?',
      answer:
        'A cada mês, aplicamos a taxa mensal equivalente sobre o saldo do mês anterior, somamos o aporte mensal e repetimos até o final do período simulado.',
    },
    {
      question: 'Qual a diferença entre juros simples e compostos?',
      answer:
        'Nos juros simples, o rendimento incide sempre sobre o valor inicial. Nos compostos, incide sobre o montante atualizado, incluindo rendimentos anteriores.',
    },
    {
      question: 'Quanto rende um investimento de R$ 1.000 por mês a 10% ao ano em 10 anos?',
      answer:
        'Com aportes de R$ 1.000 mensais, taxa de 10% ao ano capitalizada mensalmente e sem valor inicial, o montante após 10 anos fica em torno de R$ 204.000 — sendo aproximadamente R$ 84.000 em juros acumulados sobre R$ 120.000 investidos.',
    },
    {
      question: 'A calculadora usa dados reais de Poupança e Selic?',
      answer:
        'Sim. Buscamos a meta Selic e o IPCA nas APIs públicas do Banco Central do Brasil, com valores de referência como fallback quando a API estiver indisponível.',
    },
    {
      question: 'Meus dados financeiros são enviados a algum servidor?',
      answer:
        'Não. Todos os cálculos ocorrem localmente no seu navegador. Nenhum valor inserido é transmitido ou armazenado.',
    },
  ],
  sources: [SOURCES_BCB, 'Fórmula de juros compostos — matemática financeira padrão (capitalização periódica)'],
  relatedTools: [
    {
      label: 'Conversor de Moedas',
      href: ROUTES.conversorMoedas,
      description: 'Cotação em tempo real e conversão entre moedas.',
    },
    {
      label: 'Calculadora de Aposentadoria',
      href: toolPath('aposentadoria'),
      description: 'Projete patrimônio e aportes para complementar o INSS.',
    },
    {
      label: 'CLT vs PJ',
      href: toolPath('clt-pj'),
      description: 'Compare salário líquido CLT com faturamento PJ equivalente.',
    },
    {
      label: 'Rescisão Trabalhista',
      href: toolPath('rescisao'),
      description: 'Calcule verbas rescisórias, férias, 13º e FGTS.',
    },
  ],
};
