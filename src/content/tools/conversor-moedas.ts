import type { ToolSeoContent } from '../types';
import { ROUTES, toolPath } from '../../constants/routes';

export const conversorMoedasContent: ToolSeoContent = {
  tool: 'juros',
  h1: 'Conversor de Moedas Online — Cotação em Tempo Real',
  metaTitle: 'Conversor de Moedas | Dólar, Euro, Bitcoin e Mais',
  metaDescription:
    'Converta dólar, euro, libra, bitcoin e mais de 100 moedas com cotação atualizada. Veja variação diária, histórico e conversões rápidas. Grátis.',
  intro:
    'O conversor de moedas do calculojuroscompostos.com.br permite transformar qualquer valor entre real brasileiro e as principais moedas do mundo — incluindo criptomoedas e metais. As cotações são atualizadas automaticamente a cada 30 minutos, com histórico e variação percentual para apoiar suas decisões de câmbio e viagem.',
  sections: [
    {
      id: 'como-funciona',
      title: 'Como funciona o conversor de moedas',
      paragraphs: [
        'Informe o valor que deseja converter, escolha a moeda de origem e a moeda de destino. O resultado é calculado em tempo real com base nas cotações de mercado, utilizando o real como moeda pivô para conversões cruzadas entre qualquer par.',
        'Além da conversão direta, a página exibe o painel de cotações do dia com variação percentual, conversões rápidas para valores comuns (1, 10, 100 e 1.000 unidades) e um gráfico histórico para as moedas mais negociadas contra o real.',
        'Esta ferramenta é independente das calculadoras financeiras do site — foi projetada para consulta de câmbio, planejamento de viagens e referência de preços internacionais.',
      ],
    },
    {
      id: 'cotacoes',
      title: 'De onde vêm as cotações?',
      paragraphs: [
        'As taxas de câmbio são obtidas de APIs públicas de mercado (currency-api e AwesomeAPI), com cache local de 30 minutos para melhor desempenho. Quando a rede não está disponível, utilizamos a última cotação em cache ou valores de referência.',
        'O histórico e a variação diária das principais moedas (dólar, euro, libra, iene, bitcoin etc.) vêm da série diária da AwesomeAPI. Criptomoedas e moedas exóticas podem ter atualização com menor frequência.',
        'Os valores exibidos são indicativos e não constituem oferta de câmbio comercial. Para operações reais, consulte seu banco ou casa de câmbio.',
      ],
    },
    {
      id: 'moedas-suportadas',
      title: 'Quais moedas posso converter?',
      paragraphs: [
        'O conversor suporta mais de 100 moedas fiduciárias, principais criptomoedas (Bitcoin, Ethereum, Solana e outras) e metais preciosos como ouro e prata. A lista completa está disponível nos seletores de moeda, com busca por nome ou código ISO.',
        'As moedas mais consultadas no Brasil — dólar americano (USD), euro (EUR), libra esterlina (GBP), peso argentino (ARS) e bitcoin (BTC) — aparecem em destaque no painel de cotações e nos atalhos rápidos.',
      ],
      list: [
        'Moedas fiduciárias: USD, EUR, GBP, JPY, CAD, AUD, CHF e dezenas de outras.',
        'Criptomoedas: BTC, ETH, SOL, XRP e outras listadas na API.',
        'Metais: ouro (XAU) e prata (XAG) por onça troy.',
      ],
    },
    {
      id: 'historico',
      title: 'Histórico e comparação de períodos',
      paragraphs: [
        'Para as principais moedas, exibimos a evolução da cotação nos últimos 30 dias, 6 meses ou 1 ano em um gráfico interativo. A tabela de comparação mostra quanto a moeda valia há 30 dias, 6 meses e 1 ano, com a variação percentual em relação à cotação atual.',
        'Essa visão ajuda a entender se o dólar, por exemplo, está em alta ou baixa no período — informação útil para quem planeja viagens, importações ou remessas internacionais.',
      ],
    },
    {
      id: 'diferenca-calculadoras',
      title: 'Conversor vs calculadoras financeiras',
      paragraphs: [
        'As calculadoras de juros compostos, CLT vs PJ, rescisão e aposentadoria simulam cenários financeiros de longo prazo com parâmetros personalizados. O conversor de moedas, por outro lado, traduz valores entre moedas com base na cotação de mercado — são ferramentas complementares, mas com propósitos distintos.',
        'Recomendamos usar o conversor para consultas pontuais de câmbio e as calculadoras para planejamento patrimonial e decisões trabalhistas.',
      ],
    },
  ],
  faq: [
    {
      question: 'Com que frequência as cotações são atualizadas?',
      answer:
        'As cotações são atualizadas automaticamente a cada 30 minutos. Na primeira visita ou ao forçar atualização, buscamos dados ao vivo das APIs de mercado.',
    },
    {
      question: 'Posso converter bitcoin e outras criptomoedas?',
      answer:
        'Sim. Bitcoin (BTC), Ethereum (ETH) e outras criptomoedas listadas na API podem ser convertidas para real e vice-versa, assim como entre si via pivô BRL.',
    },
    {
      question: 'A cotação do conversor é a mesma do banco?',
      answer:
        'Não necessariamente. Bancos e casas de câmbio aplicam spreads, taxas e horários comerciais diferentes. Use nosso conversor como referência indicativa.',
    },
    {
      question: 'O conversor funciona offline?',
      answer:
        'Se você já visitou a página recentemente, as últimas cotações em cache podem ser usadas sem conexão. Sem cache, é necessário acesso à internet.',
    },
    {
      question: 'Como ver o histórico do dólar?',
      answer:
        'Selecione USD como moeda de origem ou destino e consulte o gráfico histórico e a tabela de comparação (30 dias, 6 meses e 1 ano) na mesma página.',
    },
  ],
  sources: [
    'AwesomeAPI — Economia (cotações e histórico BRL)',
    'currency-api (@fawazahmed0) — Matriz global de câmbio',
  ],
  relatedTools: [
    {
      label: 'Calculadora de Juros Compostos',
      href: toolPath('juros'),
      description: 'Simule crescimento de patrimônio com aportes mensais.',
    },
    {
      label: 'CLT vs PJ',
      href: toolPath('clt-pj'),
      description: 'Compare salário CLT com faturamento PJ.',
    },
    {
      label: 'Calculadora de Aposentadoria',
      href: toolPath('aposentadoria'),
      description: 'Projete patrimônio e renda na aposentadoria.',
    },
    {
      label: 'Todas as calculadoras',
      href: ROUTES.home,
      description: 'Acesse as ferramentas de simulação financeira.',
    },
  ],
};
