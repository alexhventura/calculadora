import type { ToolSeoContent } from '../types';
import { toolPath } from '../../constants/routes';
import { SOURCES_BCB, SOURCES_INSS } from '../../constants/eeat';

export const aposentadoriaContent: ToolSeoContent = {
  tool: 'aposentadoria',
  h1: 'Calculadora de Aposentadoria e Previdência Privada',
  metaTitle: 'Calculadora de Aposentadoria | Quanto Investir para se Aposentar',
  metaDescription:
    'Calcule patrimônio necessário, lacuna de renda INSS e aporte mensal para aposentadoria. Simule com taxa real líquida de inflação. Grátis.',
  intro:
    'Planejar a aposentadoria exige estimar quanto o INSS cobrirá da sua renda desejada e quanto patrimônio privado você precisa acumular para complementar. Nossa calculadora projeta a lacuna de renda, o montante necessário e o aporte mensal com base em taxa real (Selic menos IPCA).',
  sections: [
    {
      id: 'o-que-e',
      title: 'O que é planejamento de aposentadoria?',
      paragraphs: [
        'O planejamento de aposentadoria consiste em estimar a renda mensal necessária para manter seu padrão de vida após parar de trabalhar e calcular quanto patrimônio é preciso acumular para gerar essa renda de forma sustentável.',
        'No Brasil, a Previdência Social (INSS) oferece benefícios com teto limitado — atualmente em torno de R$ 7.786,02 para benefícios de valor cheio. Se sua renda desejada na aposentadoria supera esse valor, a diferença (lacuna) precisa ser coberta por investimentos privados: previdência PGBL/VGBL, Tesouro, fundos ou carteira diversificada.',
        'Nossa ferramenta calcula essa lacuna, projeta o crescimento do patrimônio atual com taxa real positiva e determina o aporte mensal necessário para atingir o montante complementar no prazo entre sua idade atual e a idade-alvo de aposentadoria.',
      ],
    },
    {
      id: 'como-calcular',
      title: 'Como calcular quanto investir para se aposentar',
      paragraphs: [
        'Informe sua idade atual, idade desejada para aposentar, renda mensal pretendida e patrimônio já acumulado. A calculadora estima a cobertura do INSS (limitada ao teto) e a lacuna restante.',
        'O patrimônio necessário é calculado com base na regra dos 0,35% ao mês (taxa de retirada segura de referência): para gerar R$ 1.000/mês de renda complementar, você precisa de aproximadamente R$ 285.714 de patrimônio. Essa é uma simplificação educativa — consulte um planejador para cenários personalizados.',
        'O aporte mensal é calculado considerando o crescimento do patrimônio atual e a taxa real de juros (Selic descontada da inflação IPCA), capitalizando os aportes até a data da aposentadoria.',
      ],
      list: [
        'Idade atual e idade-alvo de aposentadoria.',
        'Renda mensal desejada na aposentadoria.',
        'Patrimônio já acumulado em investimentos.',
      ],
    },
    {
      id: 'exemplos',
      title: 'Exemplos práticos',
      paragraphs: [
        'Pessoa de 30 anos que deseja R$ 10.000/mês aos 65 anos: o INSS cobre até o teto (~R$ 7.786), restando lacuna de ~R$ 2.214/mês. O patrimônio complementar necessário fica em torno de R$ 632.000, e o aporte mensal dependerá do patrimônio atual e da taxa real projetada.',
        'Quem começa com R$ 50.000 já investidos e tem 35 anos pela frente precisa de aportes menores do que quem começa do zero — demonstrando a importância de começar cedo, mesmo com valores modestos.',
        'Inflação corrói o poder de compra: por isso usamos taxa real (rendimento acima do IPCA) e não apenas taxa nominal. Um investimento que rende 10% com inflação de 5% gera ganho real de aproximadamente 4,76% ao ano.',
      ],
    },
    {
      id: 'inss-teto',
      title: 'INSS, teto e regras de aposentadoria',
      paragraphs: [
        'As regras de aposentadoria no Brasil passaram por reformas significativas (EC 103/2019). Hoje existem regras de transição e regras permanentes com idade mínima, tempo de contribuição e pontos. O valor do benefício depende da média de contribuições e do tempo de filiação.',
        'Nossa calculadora utiliza o teto do INSS como referência máxima de cobertura — uma simplificação para planejamento. Seu benefício real pode ser menor, dependendo do histórico contributivo.',
        'Para estimativas oficiais, consulte o Meu INSS (aplicativo e portal do governo) e um profissional de previdência social.',
      ],
    },
    {
      id: 'erros-comuns',
      title: 'Erros comuns no planejamento de aposentadoria',
      paragraphs: [
        'Confiar apenas no INSS: o teto cobre uma parcela, mas provavelmente não manterá seu padrão de vida se você tem renda atual acima da média nacional.',
        'Não corrigir por inflação: planejar com valores nominais de hoje para daqui a 30 anos subestima drasticamente o patrimônio necessário.',
        'Subestimar expectativa de vida: aposentadoria pode durar 25-30 anos. O patrimônio precisa sustentar renda por décadas, não apenas alguns anos.',
        'Ignorar imprevistos: saúde, auxílio a familiares e emergências exigem reserva além da renda mensal planejada.',
      ],
      list: [
        'Depender exclusivamente do INSS.',
        'Não considerar inflação no longo prazo.',
        'Começar a investir tarde demais.',
        'Não diversificar investimentos.',
        'Usar taxa de retorno irrealista (muito alta).',
      ],
    },
  ],
  faq: [
    {
      question: 'Quanto preciso acumular para me aposentar?',
      answer:
        'Depende da renda desejada, cobertura do INSS e taxa de retirada. A calculadora estima o patrimônio complementar com base na lacuna de renda e na regra de 0,35% ao mês.',
    },
    {
      question: 'O que é lacuna de renda na aposentadoria?',
      answer:
        'É a diferença entre a renda mensal que você deseja e o que o INSS pode cobrir (limitado ao teto do benefício).',
    },
    {
      question: 'Qual taxa de juros a calculadora usa?',
      answer:
        'Utilizamos a taxa real: Selic menos IPCA, obtidos das APIs do Banco Central, para projetar crescimento acima da inflação.',
    },
    {
      question: 'PGBL ou VGBL: qual escolher?',
      answer:
        'PGBL permite dedução no IR para quem faz declaração completa. VGBL é indicado para declaração simplificada. Consulte um assessor para sua situação.',
    },
    {
      question: 'Com que idade devo começar a planejar?',
      answer:
        'Quanto antes, melhor. Juros compostos favorecem quem começa cedo — mesmo com aportes menores.',
    },
  ],
  sources: [SOURCES_BCB, SOURCES_INSS, 'EC 103/2019 — Reforma da Previdência Social'],
  relatedTools: [
    { label: 'Juros Compostos', href: toolPath('juros'), description: 'Simule crescimento patrimonial com aportes.' },
    { label: 'CLT vs PJ', href: toolPath('clt-pj'), description: 'Compare regimes e impacto na renda.' },
    { label: 'Rescisão Trabalhista', href: toolPath('rescisao'), description: 'Calcule verbas ao mudar de emprego.' },
  ],
};
