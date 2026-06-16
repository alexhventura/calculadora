import type { ToolSeoContent } from '../types';
import { toolPath } from '../../constants/routes';
import { SOURCES_INSS } from '../../constants/eeat';

export const cltVsPjContent: ToolSeoContent = {
  tool: 'clt-pj',
  h1: 'Calculadora CLT vs PJ — Compare Salário e Faturamento',
  metaTitle: 'Calculadora CLT vs PJ | Quanto Faturar como PJ?',
  metaDescription:
    'Compare salário líquido CLT com faturamento PJ no Simples Nacional. Veja INSS, IRRF, benefícios, FGTS e faturamento mínimo equivalente. Grátis.',
  intro:
    'Decidir entre trabalhar como CLT ou abrir uma PJ (MEI ou Simples Nacional) envolve muito mais do que comparar salário bruto com nota fiscal. Nossa calculadora analisa o líquido real, benefícios, 13º salário, férias, FGTS e o faturamento mínimo que você precisaria como PJ para empatar.',
  sections: [
    {
      id: 'o-que-e',
      title: 'O que é a comparação CLT vs PJ?',
      paragraphs: [
        'A relação CLT (Consolidação das Leis do Trabalho) garante ao trabalhador direitos como 13º salário, férias remuneradas com adicional de um terço, FGTS, seguro-desemprego e contribuição previdenciária patronal. Já o regime PJ (Pessoa Jurídica) oferece flexibilidade e potencial de economia tributária, mas transfere ao profissional o custo de benefícios, impostos e encargos antes cobertos pelo empregador.',
        'Nossa ferramenta calcula o salário líquido CLT após INSS e IRRF progressivos, soma o valor anualizado de benefícios (vale-refeição, plano de saúde, outros) e o FGTS depositado mensalmente. Em seguida, faz a engenharia reversa para descobrir qual faturamento PJ no Simples Nacional (Anexo III, alíquota de 6%) seria necessário para igualar essa renda real.',
        'O resultado inclui custos típicos de PJ: DAS mensal e honorários de contabilidade estimados em R$ 200/mês — valores que muitas comparações simplistas ignoram.',
      ],
    },
    {
      id: 'como-calcular',
      title: 'Como usar a calculadora CLT vs PJ',
      paragraphs: [
        'Informe seu salário bruto CLT e os benefícios mensais que a empresa oferece: vale-refeição, plano de saúde e outros auxílios. A calculadora aplica as tabelas progressivas de INSS e IRRF vigentes para estimar o líquido mensal.',
        'Para o lado PJ, calculamos o faturamento mínimo necessário considerando o Simples Nacional Anexo III (6% sobre faturamento), mais o custo fixo de contabilidade. O resultado mostra se o regime PJ seria vantajoso em termos de faturamento bruto necessário versus o salário CLT atual.',
        'Lembre-se: a PJ também exige gestão de fluxo de caixa, ausência de FGTS como rede de segurança e responsabilidade por contribuições previdenciárias próprias — fatores qualitativos que nenhuma calculadora substitui completamente.',
      ],
      list: [
        'Salário bruto CLT: valor do contrato de trabalho.',
        'Benefícios: VR, plano de saúde e outros custos que a PJ precisaria cobrir.',
        'Resultado PJ: faturamento mínimo no Simples Nacional para equivalência.',
      ],
    },
    {
      id: 'exemplos',
      title: 'Exemplos práticos',
      paragraphs: [
        'Profissional com salário de R$ 8.000 brutos, VR de R$ 1.000, plano de saúde de R$ 650 e outros R$ 400: o líquido mensal fica em torno de R$ 6.800 após descontos, mas a remuneração total anualizada (incluindo 13º, férias + 1/3, FGTS e benefícios) equivale a um valor mensal significativamente maior.',
        'Para empatar essa renda real como PJ no Simples Nacional, o faturamento mensal necessário pode superar R$ 12.000 — valor que surpreende quem compara apenas R$ 8.000 CLT com R$ 8.000 de nota fiscal.',
        'Em salários mais altos, a progressividade do IRRF e o teto do INSS aumentam a atratividade da PJ, mas o custo de benefícios de qualidade (plano de saúde familiar, por exemplo) pode consumir boa parte da economia tributária.',
      ],
    },
    {
      id: 'simples-nacional',
      title: 'Simples Nacional e Anexo III',
      paragraphs: [
        'O Simples Nacional unifica oito tributos em uma guia única (DAS). Para prestadores de serviços enquadrados no Anexo III, a alíquota inicial é de 6% sobre o faturamento bruto mensal, podendo aumentar conforme a faixa de receita nos últimos 12 meses.',
        'A calculadora utiliza a alíquota base de 6% como referência educativa. Se sua receita ultrapassar R$ 180.000 anuais ou mudar de anexo, os percentuais reais podem diferir. Consulte um contador para enquadramento correto.',
        'MEI (Microempreendedor Individual) tem limite de faturamento de R$ 81.000/ano e não se aplica a todos os tipos de atividade. Profissionais de TI, consultoria e serviços intelectuais geralmente precisam de ME ou EPP no Simples.',
      ],
    },
    {
      id: 'erros-comuns',
      title: 'Erros comuns na decisão CLT vs PJ',
      paragraphs: [
        'Comparar salário bruto CLT com faturamento PJ sem descontar impostos, contador e benefícios é o erro mais grave. O número que importa é o líquido disponível para gastar e investir.',
        'Ignorar o FGTS e a multa de 40% em demissão sem justa causa: como PJ, você precisa reservar esse colchão por conta própria.',
        'Não considerar férias e 13º: como PJ, se não trabalhar, não recebe. A calculadora anualiza esses direitos CLT para uma comparação justa.',
        'Esquecer que PJ exige capital de giro: clientes podem pagar em 30, 60 ou 90 dias, enquanto CLT recebe mensalmente.',
      ],
      list: [
        'Comparar bruto CLT com faturamento PJ bruto.',
        'Ignorar custo de plano de saúde e benefícios.',
        'Não reservar para FGTS, férias e 13º equivalentes.',
        'Subestimar custo de contabilidade e impostos.',
      ],
    },
  ],
  faq: [
    {
      question: 'Quanto preciso faturar como PJ para ganhar o mesmo que CLT?',
      answer:
        'Depende do salário bruto, benefícios e faixa de tributação. Nossa calculadora faz essa engenharia reversa automaticamente com base no Simples Nacional Anexo III (6%).',
    },
    {
      question: 'A calculadora considera INSS e IRRF?',
      answer:
        'Sim. Aplicamos as tabelas progressivas vigentes de INSS e IRRF sobre o salário CLT para calcular o líquido real.',
    },
    {
      question: 'PJ no Simples Nacional paga quanto de imposto?',
      answer:
        'No Anexo III, a alíquota inicial é de 6% sobre o faturamento bruto, além de custos fixos como contabilidade. Alíquotas aumentam conforme a faixa de receita.',
    },
    {
      question: 'MEI é melhor que CLT?',
      answer:
        'MEI tem limite de faturamento (R$ 81.000/ano) e restrições de atividade. Para profissionais com salários altos, geralmente não é opção viável.',
    },
    {
      question: 'Os benefícios CLT entram no cálculo?',
      answer:
        'Sim. Vale-refeição, plano de saúde e outros benefícios são somados porque representam custo que o PJ precisaria arcar.',
    },
  ],
  sources: [SOURCES_INSS, 'Simples Nacional — Anexo III (Lei Complementar 123/2006)'],
  relatedTools: [
    { label: 'Juros Compostos', href: toolPath('juros'), description: 'Simule crescimento do patrimônio com aportes.' },
    { label: 'Rescisão Trabalhista', href: toolPath('rescisao'), description: 'Calcule verbas ao sair do emprego CLT.' },
    { label: 'Aposentadoria', href: toolPath('aposentadoria'), description: 'Planeje renda complementar ao INSS.' },
  ],
};
