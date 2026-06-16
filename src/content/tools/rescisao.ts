import type { ToolSeoContent } from '../types';
import { toolPath } from '../../constants/routes';
import { SOURCES_CLT } from '../../constants/eeat';

export const rescisaoContent: ToolSeoContent = {
  tool: 'rescisao',
  h1: 'Calculadora de Rescisão Trabalhista CLT',
  metaTitle: 'Calculadora de Rescisão Trabalhista | Verbas, FGTS e Multa 40%',
  metaDescription:
    'Calcule rescisão CLT: saldo de salário, 13º proporcional, férias + 1/3, FGTS e multa de 40%. Simule demissão sem justa causa. Grátis.',
  intro:
    'Ao encerrar um contrato de trabalho CLT, o trabalhador tem direito a diversas verbas rescisórias. Nossa calculadora estima saldo de salário, 13º proporcional, férias com terço constitucional, FGTS acumulado e multa de 40% conforme o motivo da rescisão.',
  sections: [
    {
      id: 'o-que-e',
      title: 'O que é rescisão trabalhista?',
      paragraphs: [
        'A rescisão trabalhista é o encerramento do contrato de trabalho entre empregado e empregador. Dependendo do motivo — demissão sem justa causa, pedido de demissão, demissão por justa causa ou acordo — os direitos financeiros variam significativamente.',
        'As verbas rescisórias incluem saldo de salário (dias trabalhados no mês da saída), 13º salário proporcional aos meses trabalhados no ano, férias proporcionais acrescidas de um terço constitucional e, em certos casos, saque do FGTS com multa de 40%.',
        'Nossa calculadora foca nas parcelas fundamentais previstas na CLT (art. 477 e correlatos), oferecendo uma estimativa educativa para planejamento financeiro ao mudar de emprego.',
      ],
    },
    {
      id: 'como-calcular',
      title: 'Como calcular verbas rescisórias',
      paragraphs: [
        'Informe o salário bruto, quantos meses trabalhou no emprego atual, quantos dias trabalhou no mês da rescisão e o motivo do desligamento. A calculadora processa cada parcela automaticamente.',
        'Saldo de salário: (salário ÷ 30) × dias trabalhados no mês. 13º proporcional: (salário ÷ 12) × avos trabalhados no ano. Férias proporcionais: mesma base do 13º, acrescida de 1/3 constitucional.',
        'FGTS: 8% do salário depositado mensalmente durante o contrato. Na demissão sem justa causa, o trabalhador saca o saldo total mais multa de 40% paga pelo empregador. No pedido de demissão, o FGTS fica retido (exceto modalidade saque-aniversário).',
      ],
      list: [
        'Salário bruto mensal.',
        'Meses trabalhados na empresa.',
        'Dias trabalhados no mês da rescisão.',
        'Motivo: sem justa causa, pedido de demissão, etc.',
      ],
    },
    {
      id: 'exemplos',
      title: 'Exemplos práticos de rescisão',
      paragraphs: [
        'Trabalhador com salário de R$ 5.000, 12 meses de empresa, demitido sem justa causa no dia 30: recebe saldo integral do mês, 13º integral (12 avos), férias proporcionais + 1/3, FGTS de R$ 4.800 (8% × 5.000 × 12) mais multa de R$ 1.920 (40%).',
        'Mesmo profissional pedindo demissão: recebe saldo, 13º e férias proporcionais, mas o FGTS permanece retido na conta vinculada — diferença que pode representar milhares de reais.',
        'Contratos curtos (menos de 12 meses) geram verbas proporcionais menores, mas o direito a férias e 13º proporcionais existe desde o primeiro mês completo trabalhado.',
      ],
    },
    {
      id: 'tipos-rescisao',
      title: 'Tipos de rescisão e direitos',
      paragraphs: [
        'Demissão sem justa causa (pelo empregador): todas as verbas rescisórias, saque do FGTS + multa 40%, seguro-desemprego (se elegível) e aviso prévio (trabalhado ou indenizado).',
        'Pedido de demissão: verbas proporcionais, sem multa FGTS, sem seguro-desemprego. FGTS retido.',
        'Demissão por justa causa: saldo de salário e férias vencidas (se houver). Sem 13º proporcional, sem FGTS, sem multa.',
        'Acordo (art. 484-A da CLT): verbas negociadas, saque de 80% do FGTS, multa de 20% (metade da multa tradicional).',
      ],
    },
    {
      id: 'erros-comuns',
      title: 'Erros comuns no cálculo de rescisão',
      paragraphs: [
        'Esquecer o adicional de 1/3 sobre férias: é direito constitucional, não opcional.',
        'Não verificar o aviso prévio: indenizado ou trabalhado altera o valor final e o prazo de pagamento (até 10 dias após desligamento).',
        'Confundir avos de 13º com meses totais: avos contam meses trabalhados no ano corrente, não o tempo total na empresa.',
        'Ignorar descontos: plano de saúde, empréstimos consignados e faltas injustificadas podem reduzir o líquido recebido.',
      ],
      list: [
        'Omitir 1/3 constitucional de férias.',
        'Não considerar aviso prévio.',
        'Esquecer descontos obrigatórios no líquido.',
        'Confundir motivo da rescisão e direito ao FGTS.',
      ],
    },
  ],
  faq: [
    {
      question: 'Quanto recebo na demissão sem justa causa?',
      answer:
        'Saldo de salário, 13º proporcional, férias + 1/3, FGTS sacável com multa de 40%, além de aviso prévio e seguro-desemprego se elegível.',
    },
    {
      question: 'Pedi demissão: posso sacar o FGTS?',
      answer:
        'Não, exceto na modalidade saque-aniversário (que reduz o saque em demissão futura). O saldo permanece na conta vinculada.',
    },
    {
      question: 'O que é a multa de 40% do FGTS?',
      answer:
        'Na demissão sem justa causa, o empregador paga 40% sobre o total depositado na conta FGTS do trabalhador, além de liberar o saque integral.',
    },
    {
      question: 'Como calcular férias proporcionais?',
      answer:
        'Divida o salário por 12 e multiplique pelos meses trabalhados (avos). Some 1/3 desse valor como adicional constitucional.',
    },
    {
      question: 'Em quanto tempo a empresa deve pagar a rescisão?',
      answer:
        'Prazo de até 10 dias corridos após o término do contrato, conforme art. 477 da CLT (com regras específicas para aviso prévio).',
    },
  ],
  sources: [SOURCES_CLT, 'Art. 484-A CLT — Rescisão por acordo entre as partes'],
  relatedTools: [
    { label: 'CLT vs PJ', href: toolPath('clt-pj'), description: 'Compare regimes antes de mudar.' },
    { label: 'Juros Compostos', href: toolPath('juros'), description: 'Planeje o que fazer com a rescisão.' },
    { label: 'Aposentadoria', href: toolPath('aposentadoria'), description: 'Invista pensando no longo prazo.' },
  ],
};
