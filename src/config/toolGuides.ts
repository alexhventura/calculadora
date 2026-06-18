import type { ActiveTool } from '../utils/calculations/toolCalculations';

export interface ToolGuideContent {
  oQueCalcula: string;
  quemDeveUsar: string;
  dadosNecessarios: string;
  resultado: string;
  exemplo: string;
}

export const TOOL_GUIDES: Record<ActiveTool, ToolGuideContent> = {
  juros: {
    oQueCalcula: 'Quanto seu dinheiro pode crescer com juros compostos ao longo do tempo.',
    quemDeveUsar: 'Quem quer poupar ou investir e ver o valor acumulado no futuro.',
    dadosNecessarios: 'Valor inicial, aporte mensal, prazo e ganho anual esperado.',
    resultado: 'Valor acumulado, total investido e ganho com juros — atualizado na hora.',
    exemplo: 'Exemplo: R$ 500 por mês durante 20 anos com 10% ao ano.',
  },
  'clt-pj': {
    oQueCalcula: 'Quanto você precisaria faturar como PJ para empatar com seu salário CLT.',
    quemDeveUsar: 'Profissionais comparando proposta CLT com contrato PJ.',
    dadosNecessarios: 'Salário bruto CLT e principais benefícios (VR, saúde, outros).',
    resultado: 'Salário líquido CLT vs faturamento PJ equivalente.',
    exemplo: 'Exemplo: R$ 8.000 CLT + R$ 1.000 de VR e plano de saúde.',
  },
  aposentadoria: {
    oQueCalcula: 'Quanto guardar por mês para atingir a renda desejada na aposentadoria.',
    quemDeveUsar: 'Quem planeja aposentadoria e quer saber o aporte mensal necessário.',
    dadosNecessarios: 'Idade atual, idade desejada para parar de trabalhar e renda mensal alvo.',
    resultado: 'Aporte mensal sugerido e valor necessário acumulado.',
    exemplo: 'Exemplo: 35 anos, aposentar aos 65 com R$ 10.000/mês de renda.',
  },
  rescisao: {
    oQueCalcula: 'Quanto você recebe na rescisão: saldo, férias, 13º e FGTS.',
    quemDeveUsar: 'Trabalhadores CLT no processo de desligamento.',
    dadosNecessarios: 'Salário, datas de admissão e desligamento, e tipo de rescisão.',
    resultado: 'Total de verbas e FGTS sacável estimado.',
    exemplo: 'Exemplo: admissão em jan/2022, saída em jun/2024, sem justa causa.',
  },
};

export const CONVERSOR_GUIDE: ToolGuideContent = {
  oQueCalcula: 'Converte valores entre moedas com cotação atualizada.',
  quemDeveUsar: 'Quem precisa saber quanto vale um valor em outra moeda.',
  dadosNecessarios: 'Valor, moeda de origem e moeda de destino.',
  resultado: 'Valor convertido na hora.',
  exemplo: 'Exemplo: converter US$ 100 para reais.',
};
