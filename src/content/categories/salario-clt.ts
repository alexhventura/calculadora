import type { HubContentBase } from '../types';
import { ROUTES } from '../../constants/routes';
import {
  SOURCES_GOV,
  SOURCES_MT,
  SOURCES_RECEITA,
} from '../../constants/eeat';

export const salarioCltHub: HubContentBase = {
  slug: 'salario-clt',
  h1: 'Guia Completo de Salário CLT e Direitos Trabalhistas',
  metaTitle: 'Salário CLT: Líquido, INSS, FGTS, Férias e Rescisão 2026 | Guia',
  metaDescription:
    'Entenda salário bruto e líquido, descontos de INSS e IRRF, FGTS, férias, 13º, horas extras, rescisão e comparação CLT vs PJ. Conteúdo baseado em fontes oficiais do governo.',
  intro:
    'O regime CLT (Consolidação das Leis do Trabalho) é o modelo de contrato de trabalho mais comum no Brasil. Para o trabalhador, entender a diferença entre salário bruto e líquido, os descontos obrigatórios, direitos como férias e 13º salário e o que compõe a rescisão é essencial para negociar emprego e planejar finanças pessoais. Este guia reúne os principais conceitos trabalhistas e tributários do emprego formal, com referência ao Ministério do Trabalho e Emprego, Gov.br e Receita Federal.',
  updatedAt: '2026-06-15',
  author: 'Equipe calculojuroscompostos.com.br',
  sections: [
    {
      id: 'o-que-e-clt',
      title: 'O que é o regime CLT',
      paragraphs: [
        'A CLT, decreto-lei nº 5.452 de 1943, consolida a legislação trabalhista brasileira e define direitos e deveres de empregados e empregadores no contrato de trabalho celetista. Características centrais: vínculo empregatício com subordinação, pessoalidade, habitualidade e onerosidade; carteira de trabalho assinada; jornada em geral limitada a 44 horas semanais; e conjunto amplo de direitos como FGTS, férias remuneradas e aviso prévio.',
        'O emprego CLT oferece proteção social — INSS, seguro-desemprego, estabilidades em situações específicas — em troca de maior carga tributária e custo para o empregador. Por isso, comparações com PJ (Pessoa Jurídica) devem considerar não apenas o valor da nota fiscal, mas benefícios, férias, 13º e encargos que o CLT embute.',
      ],
      subsections: [
        {
          id: 'vinculo-empregaticio',
          title: 'Vínculo empregatício',
          paragraphs: [
            'Existem cinco elementos que caracterizam vínculo: pessoa física, pessoalidade, não eventualidade, subordinação e onerosidade. Contratos que disfarçam relação de emprego (pejotização irregular) podem ser reconhecidos pela Justiça do Trabalho, com pagamento retroativo de direitos.',
          ],
        },
      ],
    },
    {
      id: 'salario-bruto-liquido',
      title: 'Salário bruto e salário líquido',
      paragraphs: [
        'Salário bruto é o valor acordado em contrato antes de descontos. Salário líquido é o que cai na conta após INSS, Imposto de Renda Retido na Fonte (IRRF) e outros descontos autorizados (vale-transporte, plano de saúde, contribuição sindical se autorizada). A diferença entre bruto e líquido surpreende muitos trabalhadores — especialmente em faixas sujeitas a alíquotas progressivas.',
        'Além do salário base, a remuneração pode incluir adicionais (insalubridade, periculosidade, noturno), comissões, gorjetas e prêmios habituais — muitos integram base de cálculo para férias, 13º, FGTS e INSS. Horas extras habituais também incorporam a remuneração para fins de direitos.',
        'Para planejamento financeiro, use sempre o líquido como referência de orçamento — mas lembre que férias, 13º e rescisão são calculados sobre o bruto e componentes salariais.',
      ],
      list: [
        'Confira o holerite mensalmente: erros de desconto acontecem.',
        'Descontos não autorizados (exceto obrigatórios e previstos em lei) podem ser contestados.',
        'Compare propostas de emprego pelo pacote total: salário, VR, VA, plano de saúde, PLR.',
      ],
    },
    {
      id: 'inss-irrf',
      title: 'INSS e Imposto de Renda na folha',
      paragraphs: [
        'O INSS sobre salário de empregado segue tabela progressiva com alíquotas de 7,5% a 14% (valores atualizados anualmente conforme legislação). A contribuição é retida pelo empregador e recolhida ao Instituto. O salário-família e outras isenções aplicam-se em faixas de renda específicas.',
        'O IRRF incide sobre a remuneração após dedução do INSS e, quando aplicável, dependentes e pensão alimentícia judicial. A tabela progressiva mensal define alíquotas de 0% a 27,5%. O desconto na folha é antecipação do imposto — a declaração anual ajusta débito ou restituição.',
        'Décimo terceiro salário e férias têm regras próprias de INSS e IRRF: o imposto pode ser calculado de forma separada (tabela exclusiva) em alguns casos, impactando o líquido recebido nesses meses.',
      ],
      subsections: [
        {
          id: 'desconto-folha',
          title: 'Outros descontos em folha',
          paragraphs: [
            'Vale-transporte pode ser descontado em até 6% do salário base. Plano de saúde e dental oferecidos pelo empregador costumam ter coparticipação descontada. Empréstimo consignado e pensão alimentícia são descontos legais quando há autorização judicial ou contrato válido.',
          ],
        },
      ],
    },
    {
      id: 'fgts',
      title: 'FGTS: Fundo de Garantia do Tempo de Serviço',
      paragraphs: [
        'O empregador deposita mensalmente 8% do salário do trabalhador em conta vinculada no FGTS. O valor não é descontado do salário — é custo adicional do empregador. Os depósitos rendem TR + 3% ao ano e podem ser sacados em situações como demissão sem justa causa, aposentadoria, compra da casa própria e calamidade pública.',
        'Na demissão sem justa causa, o trabalhador saca o saldo das contas do empregador e recebe multa de 40% sobre os depósitos (paga pelo empregador, não debitada do FGTS). Na demissão por justa causa, não há multa de 40% nem saque do FGTS, salvo aposentadoria ou outras hipóteses legais.',
        'O FGTS é patrimônio de longo prazo frequentemente subestimado. Ao trocar de emprego, os saldos permanecem nas contas vinculadas — consulte o extrato pelo aplicativo FGTS ou Caixa.',
      ],
    },
    {
      id: 'ferias-decimo',
      title: 'Férias e 13º salário',
      paragraphs: [
        'Férias: após cada período aquisitivo de 12 meses de trabalho, o empregado tem direito a 30 dias de férias remuneradas, acrescidos de um terço constitucional (1/3 a mais sobre o valor das férias). Férias podem ser divididas em até três períodos, um dos quais com mínimo de 14 dias. Abono pecuniário (venda de 10 dias) é opcional mediante acordo.',
        'Décimo terceiro salário: pago em duas parcelas, geralmente em novembro e dezembro. A primeira parcela pode ser paga sem desconto de INSS e IRRF; a segunda inclui descontos e o saldo. Trabalhadores com menos de um ano recebem proporcional aos meses trabalhados.',
        'Ambos integram remuneração para cálculo de benefícios e são direitos irrenunciáveis. Empregador que não paga pode ser acionado na Justiça do Trabalho.',
      ],
      subsections: [
        {
          id: 'ferias-proporcionais',
          title: 'Férias e 13º na rescisão',
          paragraphs: [
            'Na rescisão, são devidas férias proporcionais acrescidas de 1/3 e 13º proporcional, além de saldo de salário e verbas rescisórias conforme o tipo de desligamento. O cálculo proporcional considera meses trabalhados no período aquisitivo ou no ano.',
          ],
        },
      ],
    },
    {
      id: 'horas-extras',
      title: 'Horas extras e adicionais',
      paragraphs: [
        'Jornada ordinária é de 8 horas diárias e 44 semanais. Horas além disso são extras, remuneradas com adicional mínimo de 50% sobre a hora normal. Domingos e feriados trabalhados sem folga compensatória exigem adicional de 100%. Banco de horas e compensação são alternativas previstas em acordo ou convenção coletiva.',
        'Adicional noturno (mínimo 20%) incide sobre trabalho entre 22h e 5h. Insalubridade e periculosidade têm percentuais definidos em lei ou norma regulamentadora, sobre salário mínimo ou salário base conforme o caso.',
        'Horas extras habituais integram média para cálculo de férias, 13º, FGTS e aviso prévio. Registrar jornada (inclusive em home office) é direito e dever — empresas devem controlar ponto.',
      ],
    },
    {
      id: 'rescisao-trabalhista',
      title: 'Rescisão trabalhista e verbas rescisórias',
      paragraphs: [
        'A rescisão do contrato CLT pode ocorrer por pedido de demissão, dispensa sem justa causa, dispensa por justa causa, acordo (Lei 13.467/2017), término de contrato a prazo ou aposentadoria. Cada modalidade gera conjunto diferente de verbas: aviso prévio trabalhado ou indenizado, saldo de salário, férias vencidas e proporcionais + 1/3, 13º proporcional, multa de 40% do FGTS (quando aplicável), liberação de guias para seguro-desemprego e saque do FGTS.',
        'O prazo para pagamento das verbas rescisórias é até dez dias corridos após o término do contrato (regra geral pós-reforma). Atraso gera multa do art. 477 da CLT em favor do trabalhador. O Termo de Rescisão do Contrato de Trabalho (TRCT) documenta valores e encerramento do vínculo.',
        'Rescisão por acordo (comum em negociações): metade do aviso prévio e da multa do FGTS, saque de 80% do FGTS, sem seguro-desemprego. Cada caso exige análise do custo-benefício para empregado e empregador.',
      ],
      list: [
        'Guarde holerites, contratos e comprovantes de depósito de FGTS.',
        'Confira o TRCT antes de assinar — divergências devem ser questionadas.',
        'Use nossa calculadora de rescisão para estimar verbas antes de negociar.',
      ],
    },
    {
      id: 'direitos-trabalhador',
      title: 'Direitos essenciais do trabalhador CLT',
      paragraphs: [
        'Além de salário, férias, 13º e FGTS, o trabalhador CLT tem direito a repouso semanal remunerado, intervalo intrajornada, licenças (maternidade, paternidade, afastamentos por doença com auxílio do INSS após carência), vale-transporte quando há deslocamento e ambiente de trabalho seguro.',
        'Estabilidades protegem em situações específicas: gestante (desde a confirmação da gravidez até cinco meses após o parto), acidentado de trabalho (12 meses após retorno), cipeiro e dirigente sindical conforme legislação. Cumprimento de convenção coletiva da categoria pode ampliar benefícios.',
        'Assédio moral e sexual, discriminação e trabalho análogo à escravidão são proibidos. Canais de denúncia incluem Ministério do Trabalho, sindicato da categoria e Ministério Público do Trabalho.',
      ],
      subsections: [
        {
          id: 'home-office',
          title: 'Teletrabalho e home office',
          paragraphs: [
            'A reforma trabalhista regulamentou o teletrabalho: responsabilidades por equipamento, reembolso de despesas e controle de jornada devem constar em contrato ou acordo individual. Direitos a férias, 13º e FGTS permanecem — apenas a forma de prestação do serviço muda.',
          ],
        },
      ],
    },
    {
      id: 'clt-vs-pj',
      title: 'CLT versus PJ: como comparar',
      paragraphs: [
        'Muitos profissionais recebem propostas como Pessoa Jurídica (MEI, Simples Nacional, lucro presumido). A comparação com CLT não pode ser linha a linha no valor bruto: o PJ precisa cobrir férias, 13º, FGTS, aviso prévio, estabilidade e contribuição previdenciária que o CLT já embute ou garante.',
        'O PJ paga INSS e impostos sobre faturamento (Simples, ISS, etc.) e arca com contabilidade. Não tem seguro-desemprego nem multa de FGTS na rescisão. Por outro lado, pode deduzir despesas operacionais e ter margem de negociação de valor — desde que o contrato seja legítimo e não configure vínculo empregatício disfarçado.',
        'Regra prática: some ao salário CLT os benefícios monetizáveis (VR, VA, plano de saúde, PLR média) e compare com o faturamento líquido PJ após impostos, INSS e custos fixos. Nossa calculadora CLT vs PJ automatiza essa comparação com parâmetros atualizados.',
      ],
      list: [
        'Exija contrato claro: PJ legítimo tem autonomia real, não subordinação disfarçada.',
        'Reserve do faturamento PJ para férias, 13º e aposentadoria — ninguém fará por você.',
        'Consulte contador para regime tributário adequado ao seu faturamento.',
      ],
    },
  ],
  faq: [
    {
      question: 'Qual a diferença entre salário bruto e líquido?',
      answer:
        'Bruto é o valor contratual antes de descontos. Líquido é o que você recebe após INSS, IRRF e outros descontos autorizados. Para orçamento pessoal, use o líquido.',
    },
    {
      question: 'O FGTS é descontado do meu salário?',
      answer:
        'Não. Os 8% são depositados pelo empregador em conta vinculada — é encargo patronal, não desconto em folha.',
    },
    {
      question: 'Quando posso sacar o FGTS?',
      answer:
        'Principais hipóteses: demissão sem justa causa, aposentadoria, término de contrato a prazo, compra da casa própria, doenças graves e calamidade pública. Consulte regras atualizadas no Gov.br e Caixa.',
    },
    {
      question: 'Como são calculadas as horas extras?',
      answer:
        'Hora extra = (salário / jornada mensal) × 1,5 para dias úteis ou × 2 para domingos e feriados sem folga. A jornada mensal padrão é 220 horas para 44h semanais.',
    },
    {
      question: 'O que recebo na demissão sem justa causa?',
      answer:
        'Geralmente: saldo de salário, aviso prévio (trabalhado ou indenizado), férias vencidas e proporcionais + 1/3, 13º proporcional, multa de 40% do FGTS, saque do FGTS e guias para seguro-desemprego.',
    },
    {
      question: 'CLT ou PJ: qual paga mais?',
      answer:
        'Depende do valor oferecido e dos benefícios. PJ pode pagar mais líquido se o bruto compensar a ausência de férias, 13º, FGTS e estabilidade — mas exige gestão própria de impostos e previdência. Compare com calculadora dedicada.',
    },
    {
      question: 'Posso ser demitido durante as férias?',
      answer:
        'A legislação proíbe a dispensa durante o período de férias, salvo falta grave (justa causa). Conheça seus direitos e busque orientação sindical ou jurídica em caso de irregularidade.',
    },
  ],
  glossary: [
    { term: 'CLT', definition: 'Consolidação das Leis do Trabalho — principal diploma que regula relações de emprego no Brasil.' },
    { term: 'Salário bruto', definition: 'Remuneração contratual antes de descontos obrigatórios e autorizados.' },
    { term: 'Salário líquido', definition: 'Valor efetivamente recebido após INSS, IRRF e demais descontos em folha.' },
    { term: 'FGTS', definition: 'Fundo de Garantia do Tempo de Serviço — depósito mensal de 8% do salário pelo empregador.' },
    { term: 'INSS', definition: 'Instituto Nacional do Seguro Social — recebe contribuições previdenciárias retidas na folha.' },
    { term: 'IRRF', definition: 'Imposto de Renda Retido na Fonte — antecipação do IR descontada mensalmente do salário.' },
    { term: 'Aviso prévio', definition: 'Período de comunicação prévia do desligamento; indenizado se não trabalhado.' },
    { term: 'TRCT', definition: 'Termo de Rescisão do Contrato de Trabalho — documento que formaliza verbas na demissão.' },
    { term: 'Pejotização', definition: 'Contratação como PJ em relação que configura vínculo empregatício — prática irregular quando há subordinação.' },
  ],
  sources: [SOURCES_MT, SOURCES_GOV, SOURCES_RECEITA],
  relatedTools: [
    { label: 'CLT vs PJ', href: ROUTES.cltPj, description: 'Compare salário CLT com faturamento PJ líquido após impostos e benefícios.' },
    { label: 'Rescisão Trabalhista', href: ROUTES.rescisao, description: 'Estime verbas rescisórias conforme tipo de desligamento.' },
  ],
  relatedCategories: [
    { label: 'Impostos', href: ROUTES.categoria('impostos') },
    { label: 'Empreendedorismo', href: ROUTES.categoria('empreendedorismo') },
  ],
};
