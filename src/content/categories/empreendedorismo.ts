import type { HubContentBase } from '../types';
import { ROUTES } from '../../constants/routes';
import { SOURCES_RECEITA, SOURCES_SEBRAE, SOURCES_GOV } from '../../constants/eeat';

export const empreendedorismoHub: HubContentBase = {
  slug: 'empreendedorismo',
  h1: 'Guia de Empreendedorismo e Gestão Financeira para Pequenos Negócios',
  metaTitle: 'Empreendedorismo no Brasil: MEI, Simples, Fluxo de Caixa e Gestão 2026',
  metaDescription:
    'Guia completo para empreendedores: abertura de empresa, MEI, Simples Nacional, fluxo de caixa, precificação, capital de giro e crescimento sustentável. Fontes oficiais SEBRAE e Receita Federal.',
  intro:
    'Empreender no Brasil exige dominar não apenas a ideia de negócio, mas tributação, fluxo de caixa e planejamento financeiro. Este guia aborda desde o MEI até o Simples Nacional, formação de preços, capital de giro e decisões como migrar de CLT para PJ — com referência a fontes oficiais do SEBRAE, Receita Federal e Gov.br.',
  updatedAt: '2026-06-15',
  author: 'Equipe calculojuroscompostos.com.br',
  sections: [
    {
      id: 'abertura',
      title: 'Abertura de empresa no Brasil',
      paragraphs: [
        'A formalização transforma uma atividade em empresa registrada, com CNPJ, obrigações fiscais e acesso a crédito empresarial. O caminho depende do porte, faturamento previsto e número de sócios. Microempreendedores podem optar pelo MEI; negócios maiores pelo Simples Nacional ou outros regimes.',
        'O Portal do Empreendedor (Gov.br) centraliza informações sobre abertura, alteração e baixa. O custo e o tempo variam por estado e tipo societário — MEI é o caminho mais simples para atividades permitidas na lista oficial.',
      ],
      subsections: [
        {
          id: 'tipos-societarios',
          title: 'Tipos societários comuns',
          paragraphs: [
            'MEI: faturamento até o limite legal, uma atividade, sem sócios. EIRELI e LTDA: estruturas para negócios com maior faturamento ou sócios. A escolha impacta tributação, responsabilidade patrimonial e obrigações contábeis.',
          ],
        },
      ],
    },
    {
      id: 'mei',
      title: 'MEI — Microempreendedor Individual',
      paragraphs: [
        'O MEI permite formalização simplificada com DAS mensal fixo, emissão de notas e direitos previdenciários. Há limite de faturamento anual e restrição às ocupações listadas pela Receita Federal. Contratar funcionário é permitido dentro das regras do programa.',
        'Vantagens: baixo custo, simplicidade, inclusão previdenciária. Limitações: teto de receita, impossibilidade de sócios e algumas atividades excluídas. Ultrapassar o limite exige migração para outro regime.',
      ],
      list: [
        'Consulte a lista de atividades permitidas no Portal do Empreendedor.',
        'Mantenha controle de faturamento para não exceder o limite anual.',
        'Emita notas fiscais conforme exigência dos clientes.',
      ],
    },
    {
      id: 'simples',
      title: 'Simples Nacional',
      paragraphs: [
        'O Simples Nacional unifica oito tributos em guia única (DAS), com alíquotas progressivas conforme faturamento e anexo da atividade. Empresas do Simples devem manter escrituração e cumprir obrigações acessórias definidas pela Receita Federal.',
        'A escolha do anexo correto (I a V) determina a carga tributária. Serviços intelectuais e consultoria frequentemente se enquadram no Anexo III ou V, dependendo do fator R. Contador é essencial para enquadramento adequado.',
      ],
    },
    {
      id: 'fluxo-caixa',
      title: 'Fluxo de caixa e gestão financeira',
      paragraphs: [
        'Fluxo de caixa registra entradas e saídas reais de dinheiro — diferente do lucro contábil, que pode incluir receitas ainda não recebidas. Empresas lucrativas quebram por falta de caixa quando há prazo longo entre venda e recebimento.',
        'Separe contas pessoais e empresariais. Reserve percentual para impostos e provisões. Monitore inadimplência e prazo médio de recebimento. O SEBRAE oferece planilhas e orientações gratuitas sobre gestão financeira.',
      ],
      subsections: [
        {
          id: 'capital-giro',
          title: 'Capital de giro',
          paragraphs: [
            'Capital de giro financia o ciclo operacional: estoque + contas a receber − contas a pagar. Insuficiência obriga o empreendedor a cobrir o buraco com recursos próprios ou crédito caro. Calcule a necessidade antes de expandir.',
          ],
        },
      ],
    },
    {
      id: 'precificacao',
      title: 'Formação de preços',
      paragraphs: [
        'Preço deve cobrir custos variáveis, rateio de custos fixos, impostos e margem de lucro desejada. Precificar abaixo do custo total gera crescimento que consome caixa — "vender muito e não sobrar nada".',
        'Métodos comuns: markup sobre custo, precificação por valor percebido e análise da concorrência. Revise preços periodicamente conforme inflação e custos de insumos.',
      ],
      list: [
        'Inclua impostos incidentes sobre a venda no preço.',
        'Considere custos invisíveis: energia, aluguel, software, pró-labore.',
        'Teste elasticidade — nem sempre o menor preço maximiza lucro.',
      ],
    },
    {
      id: 'planejamento',
      title: 'Planejamento empresarial e crescimento sustentável',
      paragraphs: [
        'Plano de negócios articula proposta de valor, mercado, estratégia e projeções financeiras. Não precisa ser documento de centenas de páginas — mas deve responder: quem paga, por quê, quanto custa entregar e quando o caixa fecha.',
        'Crescimento sustentável preserva qualidade, equipe e caixa. Expandir antes de processos sólidos multiplica problemas. Indicadores-chave: margem líquida, ticket médio, CAC, LTV e ciclo de caixa.',
      ],
    },
    {
      id: 'clt-vs-pj',
      title: 'CLT vs PJ para empreendedores e profissionais',
      paragraphs: [
        'Profissionais que deixam o emprego formal para prestar serviços como PJ devem comparar salário líquido CLT (com 13º, férias, FGTS e INSS patronal) com faturamento PJ descontados impostos, contador, benefícios próprios e risco de renda irregular.',
        'Use nossa calculadora CLT vs PJ para simular equivalência. Lembre-se: PJ exige disciplina de reservas, previdência e gestão tributária que o CLT oferece automaticamente.',
      ],
    },
  ],
  faq: [
    {
      question: 'Qual a diferença entre MEI e Simples Nacional?',
      answer:
        'MEI é para microempreendedor individual com faturamento limitado e atividade específica. Simples Nacional atende ME e EPP com faturamento maior, com tributação unificada e mais complexidade contábil.',
    },
    {
      question: 'MEI pode contratar funcionário?',
      answer:
        'Sim, o MEI pode ter um empregado cadastrado, pagando encargos conforme regras do programa. Consulte o Portal do Empreendedor para valores atualizados.',
    },
    {
      question: 'Como calcular o preço de venda?',
      answer:
        'Some custos diretos, rateio de fixos, impostos e margem desejada. Divida pelo volume esperado. Revise quando custos ou concorrência mudarem.',
    },
    {
      question: 'O que é capital de giro?',
      answer:
        'Recursos necessários para financiar operação do dia a dia — estoque, recebíveis e pagamentos a fornecedores — sem depender de empréstimos de emergência.',
    },
    {
      question: 'Vale a pena sair da CLT para abrir PJ?',
      answer:
        'Depende do faturamento possível, custos fixos, benefícios que você precisa contratar e tolerância a risco. Simule com nossa calculadora CLT vs PJ antes de decidir.',
    },
    {
      question: 'Onde buscar orientação gratuita?',
      answer:
        'O SEBRAE oferece cursos, consultorias e conteúdo gratuito. A Receita Federal e o Portal do Empreendedor publicam guias oficiais sobre obrigações fiscais.',
    },
  ],
  glossary: [
    { term: 'MEI', definition: 'Microempreendedor Individual — regime simplificado de formalização para pequenos negócios.' },
    { term: 'Simples Nacional', definition: 'Regime tributário que unifica impostos federais, estaduais e municipais em alíquota única.' },
    { term: 'DAS', definition: 'Documento de Arrecadação do Simples — guia mensal de tributos do MEI e Simples.' },
    { term: 'CNPJ', definition: 'Cadastro Nacional da Pessoa Jurídica — identificação fiscal da empresa.' },
    { term: 'Fluxo de caixa', definition: 'Controle de entradas e saídas efetivas de dinheiro no período.' },
    { term: 'Capital de giro', definition: 'Recursos para financiar o ciclo operacional do negócio.' },
    { term: 'Pro-labore', definition: 'Remuneração do sócio pela participação na gestão, com desconto de INSS.' },
    { term: 'Fator R', definition: 'Relação folha/receita que define anexo do Simples para algumas atividades de serviço.' },
  ],
  sources: [SOURCES_SEBRAE, SOURCES_RECEITA, SOURCES_GOV],
  relatedTools: [
    { label: 'CLT vs PJ', href: ROUTES.cltPj, description: 'Compare salário CLT com faturamento PJ equivalente.' },
    { label: 'Juros Compostos', href: ROUTES.home, description: 'Projete reservas e investimentos do negócio.' },
    { label: 'Rescisão Trabalhista', href: ROUTES.rescisao, description: 'Calcule verbas ao desligar colaboradores CLT.' },
  ],
  relatedCategories: [
    { label: 'Salário e CLT', href: ROUTES.categoria('salario-clt') },
    { label: 'Finanças Pessoais', href: ROUTES.categoria('financas-pessoais') },
  ],
};
