import type { ActiveTool } from '../../utils/calculations/toolCalculations';

export interface FieldInstruction {
  nome: string;
  descricao: string;
  dica?: string;
  modo: 'simples' | 'avancado';
}

export interface HowToUseContent {
  titulo: string;
  introducao: string;
  passos: string[];
  campos: FieldInstruction[];
}

export const HOW_TO_USE: Record<ActiveTool, HowToUseContent> = {
  juros: {
    titulo: 'Como usar — Juros Compostos',
    introducao:
      'Simule quanto seu dinheiro pode crescer ao longo do tempo. Preencha os quatro campos principais; o resultado atualiza automaticamente.',
    passos: [
      'Informe quanto você já tem guardado hoje (pode ser zero).',
      'Digite quanto pretende guardar todo mês.',
      'Defina por quantos anos ou meses vai investir.',
      'Informe o ganho anual esperado do investimento (ex.: 10% ao ano).',
      'Use "Personalizar cálculo" para inflação, IR, taxas Selic/CDI e aportes em outras frequências.',
    ],
    campos: [
      {
        nome: 'Quanto você já tem (R$)',
        descricao: 'Valor que você já possui investido ou guardado antes dos aportes mensais.',
        dica: 'Deixe zero se está começando do nada.',
        modo: 'simples',
      },
      {
        nome: 'Quanto guardar por mês (R$)',
        descricao: 'Aporte que você fará regularmente durante o período simulado.',
        modo: 'simples',
      },
      {
        nome: 'Por quanto tempo',
        descricao: 'Duração da simulação em anos ou meses.',
        modo: 'simples',
      },
      {
        nome: 'Ganho anual esperado (%)',
        descricao: 'Rentabilidade média anual que você espera do investimento.',
        dica: 'Ex.: poupança ~8%, CDI ~14%, ou um valor personalizado.',
        modo: 'simples',
      },
      {
        nome: 'Referência Selic / CDI / Poupança',
        descricao: 'Substitui o ganho manual por taxas de mercado atualizadas.',
        modo: 'avancado',
      },
      {
        nome: 'Inflação e tributação',
        descricao: 'Ajuste IPCA e imposto sobre ganhos para ver o valor líquido e real.',
        modo: 'avancado',
      },
      {
        nome: 'Taxas de administração',
        descricao: 'Desconta custos de fundos (administração, performance, custódia).',
        modo: 'avancado',
      },
    ],
  },
  'clt-pj': {
    titulo: 'Como usar — CLT vs PJ',
    introducao:
      'Compare quanto você recebe como CLT com o faturamento PJ necessário para ter a mesma renda real, considerando benefícios e impostos.',
    passos: [
      'Informe seu salário bruto CLT.',
      'Some VR/VA, plano de saúde e outros benefícios mensais.',
      'Veja o faturamento PJ equivalente nos resultados.',
      'Em "Personalizar cálculo", escolha regime PJ (Simples, MEI, Lucro Presumido) e compare propostas.',
    ],
    campos: [
      {
        nome: 'Salário bruto CLT (R$)',
        descricao: 'Valor da carteira assinada antes de descontos.',
        modo: 'simples',
      },
      {
        nome: 'VR/VA mensal (R$)',
        descricao: 'Vale-refeição ou vale-alimentação recebido da empresa.',
        modo: 'simples',
      },
      {
        nome: 'Plano de saúde (R$)',
        descricao: 'Custo do plano pago pelo empregador (ou equivalente).',
        modo: 'simples',
      },
      {
        nome: 'Outros benefícios (R$)',
        descricao: 'Transporte, gympass, bônus fixos mensais, etc.',
        modo: 'simples',
      },
      {
        nome: 'Regime PJ',
        descricao: 'Simples 6%, MEI ou Lucro Presumido alteram o imposto estimado.',
        modo: 'avancado',
      },
      {
        nome: 'Faturamento PJ informado',
        descricao: 'Compare uma proposta real que você recebeu com a equivalência CLT.',
        modo: 'avancado',
      },
    ],
  },
  aposentadoria: {
    titulo: 'Como usar — Aposentadoria',
    introducao:
      'Descubra quanto guardar por mês para atingir a renda desejada. Comece pelos três campos essenciais; use o modo completo para maior precisão.',
    passos: [
      'Informe sua idade atual e a idade em que deseja aposentar.',
      'Defina a renda mensal que quer receber na aposentadoria.',
      'Opcionalmente, informe quanto já guardou (patrimônio atual).',
      'Use "Modo completo" para salário atual, tipo de benefício, cenários de investimento e benefício INSS manual.',
    ],
    campos: [
      {
        nome: 'Sua idade hoje',
        descricao: 'Idade atual em anos completos.',
        modo: 'simples',
      },
      {
        nome: 'Idade para aposentar',
        descricao: 'Com quantos anos você pretende parar de trabalhar.',
        modo: 'simples',
      },
      {
        nome: 'Renda mensal desejada (R$)',
        descricao: 'Quanto você quer receber por mês quando aposentar.',
        modo: 'simples',
      },
      {
        nome: 'Quanto já guardou (R$)',
        descricao: 'Patrimônio que você já tem investido hoje. Deixe zero se ainda não guardou.',
        modo: 'simples',
      },
      {
        nome: 'Salário atual (R$)',
        descricao: 'Usado para projetar manter o padrão de vida atual na aposentadoria.',
        modo: 'avancado',
      },
      {
        nome: 'Tipo de benefício',
        descricao: 'INSS, servidor público, previdência privada ou planejamento independente.',
        modo: 'avancado',
      },
      {
        nome: 'Benefício mensal manual (R$)',
        descricao: 'Se souber quanto receberá do INSS ou previdência, informe aqui para substituir a estimativa.',
        modo: 'avancado',
      },
      {
        nome: 'Quanto já guarda por mês (R$)',
        descricao: 'Aporte mensal que você já faz hoje; será descontado do aporte necessário.',
        modo: 'avancado',
      },
      {
        nome: 'Cenário de investimento',
        descricao: 'Conservador, moderado, agressivo ou taxa personalizada para projetar rendimentos.',
        modo: 'avancado',
      },
      {
        nome: 'Taxa de retirada mensal (%)',
        descricao: 'Percentual do patrimônio que você retira por mês na aposentadoria (padrão 0,35%).',
        modo: 'avancado',
      },
    ],
  },
  rescisao: {
    titulo: 'Como usar — Rescisão Trabalhista',
    introducao:
      'Calcule verbas rescisórias, férias, 13º e FGTS com base no salário, datas e tipo de desligamento.',
    passos: [
      'Informe o salário bruto mensal.',
      'Preencha a data de admissão e de desligamento.',
      'Escolha o tipo de rescisão (sem justa causa, pedido, etc.).',
      'Confira o total nas verbas e no FGTS sacável.',
    ],
    campos: [
      {
        nome: 'Salário bruto (R$)',
        descricao: 'Último salário base da carteira assinada.',
        modo: 'simples',
      },
      {
        nome: 'Data de admissão',
        descricao: 'Quando você começou a trabalhar na empresa.',
        modo: 'simples',
      },
      {
        nome: 'Data de desligamento',
        descricao: 'Último dia trabalhado ou data da rescisão.',
        modo: 'simples',
      },
      {
        nome: 'Tipo de rescisão',
        descricao: 'Define se há multa de FGTS, aviso prévio e direito ao seguro-desemprego.',
        modo: 'simples',
      },
      {
        nome: 'Férias vencidas / aviso prévio',
        descricao: 'Marque se tinha férias vencidas ou aviso prévio indenizado.',
        modo: 'avancado',
      },
      {
        nome: 'Verbas manuais',
        descricao: 'Informe valores exatos se souber o cálculo da contabilidade.',
        modo: 'avancado',
      },
    ],
  },
};

export const CONVERSOR_HOW_TO_USE: HowToUseContent = {
  titulo: 'Como usar — Conversor de Moedas',
  introducao: 'Converta valores entre moedas com cotação atualizada. O resultado aparece na hora.',
  passos: [
    'Digite o valor a converter.',
    'Escolha a moeda de origem e a moeda de destino.',
    'Use "Personalizar cálculo" para cotação turismo ou paralelo.',
  ],
  campos: [
    { nome: 'Valor', descricao: 'Quantidade na moeda de origem.', modo: 'simples' },
    { nome: 'Moeda de origem', descricao: 'Moeda que você possui.', modo: 'simples' },
    { nome: 'Moeda de destino', descricao: 'Moeda para a qual deseja converter.', modo: 'simples' },
    { nome: 'Tipo de cotação', descricao: 'Comercial, turismo ou paralelo.', modo: 'avancado' },
  ],
};
