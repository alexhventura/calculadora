import type { InstitutionalContent } from '../types';
import { ROUTES } from '../../constants/routes';
import { SOURCES } from '../../constants/eeat';
import { SITE_DOMAIN, SITE_AUTHOR } from '../../constants/site';
import { LEGAL_PRIVACIDADE, LEGAL_TERMOS, LEGAL_COOKIES } from './legal-pages';

export const INSTITUTIONAL_PAGES: Record<string, InstitutionalContent> = {
  sobre: {
    slug: 'sobre',
    title: 'Sobre o calculojuroscompostos.com.br',
    h1: 'Sobre o calculojuroscompostos.com.br',
    metaTitle: 'Sobre Nós | Calculadoras Financeiras Gratuitas e Educação Financeira',
    metaDescription:
      'Conheça o calculojuroscompostos.com.br: missão, ferramentas gratuitas, metodologia de cálculo, valores editoriais e compromisso com transparência E-E-A-T para investidores e trabalhadores brasileiros.',
    intro:
      'O calculojuroscompostos.com.br é um portal brasileiro de educação financeira e ferramentas de simulação. Nossa proposta é simples: transformar conceitos complexos — juros compostos, previdência, rescisão trabalhista, tributação de PJ — em números claros, acessíveis e calculados no seu próprio navegador. Não somos banco, corretora ou assessoria de investimentos; somos um projeto editorial independente focado em transparência, privacidade e conteúdo original em português.',
    updatedAt: '2026-06-16',
    author: SITE_AUTHOR,
    sections: [
      {
        id: 'missao',
        title: 'Nossa missão',
        paragraphs: [
          'Acreditamos que decisões financeiras mais conscientes começam com informação de qualidade e ferramentas que qualquer pessoa consiga usar, sem barreiras de cadastro, pagamento ou exposição desnecessária de dados pessoais.',
          'A missão do calculojuroscompostos.com.br é democratizar o acesso a simuladores confiáveis e conteúdo educativo sobre finanças pessoais, investimentos, aposentadoria e direitos trabalhistas no contexto brasileiro — sempre com linguagem direta e referências a fontes oficiais quando aplicável.',
          'Queremos que um estudante, um trabalhador CLT em dúvida sobre PJ, um investidor iniciante ou alguém planejando a aposentadoria encontre aqui um ponto de partida seguro para entender cenários, comparar alternativas e formular perguntas melhores aos profissionais que eventualmente contratar.',
        ],
        subsections: [
          {
            id: 'publico',
            title: 'Para quem criamos este site',
            paragraphs: [
              'Nosso público principal são brasileiros que buscam autonomia informacional: quem quer simular quanto investir por mês para atingir uma meta, comparar rendimento entre Poupança, CDI e Selic, estimar verbas rescisórias ou avaliar se a transição CLT para PJ faz sentido em termos de custo e benefício.',
              'Não substituímos consultoria personalizada, mas reduzimos a assimetria de informação que historicamente favorece quem já domina jargões financeiros e normas trabalhistas.',
            ],
          },
          {
            id: 'compromisso',
            title: 'Compromisso com o leitor',
            paragraphs: [
              'Publicamos conteúdo revisado periodicamente, indicamos limitações dos modelos matemáticos e deixamos explícito quando um resultado é estimativa — não promessa de retorno. Não vendemos produtos financeiros nem recebemos comissão por indicação de investimentos.',
            ],
          },
        ],
      },
      {
        id: 'ferramentas',
        title: 'Ferramentas e conteúdo disponíveis',
        paragraphs: [
          'O site reúne calculadoras interativas, hubs temáticos por categoria e artigos de blog com foco educativo. Todas as simulações numéricas são processadas localmente no navegador do usuário: os valores que você digita não são transmitidos aos nossos servidores.',
        ],
        subsections: [
          {
            id: 'calculadoras',
            title: 'Calculadoras principais',
            paragraphs: [
              'A calculadora de juros compostos permite projetar patrimônio com capital inicial, aportes periódicos e diferentes taxas — incluindo comparação com referências como Poupança, Selic e CDI quando disponíveis via APIs públicas.',
              'A calculadora CDI e a calculadora IPCA ajudam a contextualizar rentabilidade nominal e o impacto da inflação no poder de compra. O comparativo CLT vs PJ estima diferenças de custo total para o empregador e rendimento líquido para o trabalhador, com parâmetros configuráveis.',
              'O planejador de aposentadoria projeta complemento ao INSS com base em aportes e taxa de retorno assumida. A calculadora de rescisão trabalhista CLT aplica regras consolidadas sobre verbas rescisórias, com ressalvas documentadas na própria ferramenta.',
            ],
            list: [
              'Juros compostos — projeção de patrimônio e comparativos de indexadores',
              'CDI e IPCA — simulações com indicadores de mercado',
              'CLT vs PJ — análise comparativa de regimes',
              'Aposentadoria — metas de renda complementar',
              'Rescisão trabalhista — estimativa de verbas rescisórias CLT',
            ],
          },
          {
            id: 'blog-categorias',
            title: 'Blog e categorias temáticas',
            paragraphs: [
              'O blog publica artigos originais sobre temas como independência financeira, Tesouro Direto, dívidas e estratégias de aporte. As páginas de categoria (investimentos, finanças pessoais, aposentadoria, salário CLT, empreendedorismo) funcionam como guias de referência com glossário, FAQ e links internos para ferramentas relacionadas.',
            ],
          },
        ],
      },
      {
        id: 'valores',
        title: 'Valores editoriais',
        paragraphs: [
          'Nosso trabalho é guiado por princípios que priorizam o leitor acima de qualquer interesse comercial em produtos específicos.',
        ],
        list: [
          'Transparência — explicamos fórmulas, premissas e fontes de dados utilizadas nas calculadoras.',
          'Privacidade — cálculos no cliente; não coletamos valores financeiros inseridos nas simulações.',
          'Acessibilidade — ferramentas gratuitas, sem cadastro obrigatório para uso básico.',
          'Independência editorial — sem recomendação de ativos, corretoras ou instituições financeiras.',
          'Atualização — revisamos conteúdo e parâmetros de referência quando indicadores ou legislação mudam.',
          'Linguagem clara — evitamos jargão desnecessário e definimos termos técnicos no glossário.',
        ],
        subsections: [
          {
            id: 'o-que-nao-fazemos',
            title: 'O que não fazemos',
            paragraphs: [
              'Não oferecemos assessoria de investimentos, consultoria jurídica, contábil ou tributária individualizada. Não garantimos rentabilidade, não intermediamos operações financeiras e não emitimos pareceres vinculantes sobre casos concretos de rescisão, contrato de trabalho ou planejamento sucessório.',
            ],
          },
        ],
      },
      {
        id: 'metodologia',
        title: 'Metodologia de cálculo e revisão',
        paragraphs: [
          'Cada ferramenta documenta suas premissas na própria página: periodicidade de capitalização, tratamento de impostos (quando simplificado), datas de referência das taxas e eventuais valores de fallback quando APIs externas estão indisponíveis.',
          'As taxas de mercado — Selic, IPCA, câmbio — são obtidas preferencialmente de APIs públicas gratuitas do Banco Central do Brasil e serviços de cotação com licença compatível com uso educativo. Quando a API falha, exibimos aviso e utilizamos último valor conhecido ou entrada manual do usuário.',
        ],
        subsections: [
          {
            id: 'formulas',
            title: 'Base matemática',
            paragraphs: [
              'Juros compostos seguem a capitalização periódica padrão: M = P × (1 + i)^n, com extensões para aportes em série quando aplicável. Simulações trabalhistas e previdenciárias aplicam alíquotas e regras vigentes documentadas nas páginas respectivas, reconhecendo que casos com convenções coletivas, acordos individuais ou regimes especiais exigem análise profissional.',
            ],
          },
          {
            id: 'revisao',
            title: 'Processo de revisão',
            paragraphs: [
              'Conteúdo editorial passa por checagem de consistência numérica, alinhamento com fontes oficiais citadas e atualização da data de revisão visível ao leitor. Conteúdo é revisado periodicamente com base em fontes oficiais e atualizações de funcionalidades, sem canal de reporte individual por parte dos usuários.',
            ],
          },
        ],
      },
      {
        id: 'eeat',
        title: 'Transparência E-E-A-T',
        paragraphs: [
          'E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) é o conjunto de sinais que buscamos transmitir: experiência prática na elaboração de ferramentas financeiras, expertise em matemática financeira e legislação brasileira aplicável, autoridade baseada em citação de fontes oficiais e confiança através de políticas claras de privacidade, termos de uso e isenção de responsabilidade.',
          'Identificamos o autor editorial como Equipe calculojuroscompostos.com.br — profissionais com experiência em planejamento financeiro pessoal, normas trabalhistas e educação financeira. Não ocultamos limitações: simulações são modelos, não espelhos perfeitos da realidade tributária ou contratual de cada leitor.',
        ],
        subsections: [
          {
            id: 'fontes-oficiais',
            title: 'Fontes e referências',
            paragraphs: [
              'Priorizamos dados e normas de órgãos como Banco Central, CVM, Tesouro Nacional, INSS, Receita Federal e Ministério do Trabalho. Links para páginas institucionais e séries temporais oficiais são listados nas ferramentas e artigos quando relevantes.',
            ],
          },
          {
            id: 'publicidade',
            title: 'Publicidade e monetização',
            paragraphs: [
              'O site pode exibir anúncios via Google AdSense. A receita publicitária sustenta a operação, mas não influencia as fórmulas das calculadoras nem o ranking editorial de conteúdo. Detalhes sobre cookies e dados de navegação estão na Política de Privacidade e na Política de Cookies.',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        question: 'O calculojuroscompostos.com.br é gratuito?',
        answer:
          'Sim. Todas as calculadoras e a maior parte do conteúdo educativo são gratuitos. Podemos exibir anúncios para cobrir custos de hospedagem e manutenção, sem cobrar pelo uso das ferramentas.',
      },
      {
        question: 'Meus dados financeiros são enviados ao servidor?',
        answer:
          'Não. Os cálculos são executados no seu navegador. Valores de investimento, salário ou parâmetros de simulação não são transmitidos aos nossos servidores. Consulte a Política de Privacidade para cookies e analytics.',
      },
      {
        question: 'Vocês recomendam investimentos específicos?',
        answer:
          'Não. Oferecemos simulações e educação genérica. Qualquer decisão de alocação em ativos, previdência privada ou mudança de regime CLT/PJ deve ser validada com profissionais habilitados e sua situação particular.',
      },
      {
        question: 'Com que frequência o conteúdo é atualizado?',
        answer:
          'Revisamos páginas quando há mudanças relevantes em legislação, indicadores ou funcionalidades das ferramentas. A data da última atualização aparece no rodapé editorial de cada página.',
      },
      {
        question: 'Posso usar os resultados em processos trabalhistas ou fiscais?',
        answer:
          'Os resultados são estimativas educativas. Não possuem valor legal vinculante. Para rescisões, planejamento tributário ou contestações, consulte advogado trabalhista ou contador.',
      },
      {
        question: 'O site oferece suporte ou atendimento?',
        answer:
          'Não. O calculojuroscompostos.com.br opera sem canal de contato, chat ou e-mail de suporte. As ferramentas são disponibilizadas de forma autônoma, conforme os Termos de Uso.',
      },
    ],
    glossary: [
      {
        term: 'E-E-A-T',
        definition:
          'Sigla em inglês para Experience, Expertise, Authoritativeness e Trustworthiness — critérios de qualidade e confiança em conteúdo, especialmente relevantes em temas financeiros e jurídicos.',
      },
      {
        term: 'Client-side',
        definition:
          'Processamento realizado no navegador do usuário, sem envio dos dados de entrada a servidores remotos.',
      },
      {
        term: 'Juros compostos',
        definition:
          'Capitalização em que os juros passam a incidir sobre o montante acumulado, gerando crescimento exponencial ao longo do tempo.',
      },
      {
        term: 'API pública',
        definition:
          'Interface de programação disponibilizada por instituições como o Banco Central para consulta automatizada de séries econômicas oficiais.',
      },
      {
        term: 'Fallback',
        definition:
          'Valor de referência alternativo utilizado quando a fonte primária de dados está temporariamente indisponível.',
      },
    ],
    sources: [SOURCES.BCB, SOURCES.CVM, SOURCES.TESOURO, SOURCES.INSS, SOURCES.MT, SOURCES.GOV],
    relatedTools: [
      {
        label: 'Juros Compostos',
        href: ROUTES.home,
        description: 'Simule patrimônio com aportes e compare indexadores.',
      },
      {
        label: 'Calculadora CDI',
        href: ROUTES.calculadoraCdi,
        description: 'Projete rendimento com taxa CDI atualizada.',
      },
      {
        label: 'CLT vs PJ',
        href: ROUTES.cltPj,
        description: 'Compare custos e benefícios entre regimes.',
      },
      {
        label: 'Aposentadoria',
        href: ROUTES.aposentadoria,
        description: 'Planeje renda complementar ao INSS.',
      },
    ],
    relatedCategories: [
      { label: 'Investimentos', href: ROUTES.categoria('investimentos') },
      { label: 'Finanças Pessoais', href: ROUTES.categoria('financas-pessoais') },
      { label: 'Aposentadoria', href: ROUTES.categoria('aposentadoria') },
    ],
  },

  privacidade: LEGAL_PRIVACIDADE,

  termos: LEGAL_TERMOS,

  cookies: LEGAL_COOKIES,

  isencao: {
    slug: 'isencao',
    title: 'Isenção de Responsabilidade',
    h1: 'Isenção de Responsabilidade',
    metaTitle: 'Isenção de Responsabilidade | calculojuroscompostos.com.br',
    metaDescription:
      'Isenção de responsabilidade do calculojuroscompostos.com.br: limitações das calculadoras, conteúdo educativo, decisões financeiras e trabalhistas, dados de mercado e links externos.',
    intro:
      'O calculojuroscompostos.com.br publica ferramentas e conteúdo com finalidade exclusivamente educativa e informativa. Esta página detalha os limites de nossa responsabilidade e os riscos inerentes ao uso de simulações e artigos sem assessoria profissional personalizada. Leia também os Termos de Uso e, quando aplicável, consulte profissionais habilitados.',
    updatedAt: '2026-06-16',
    author: SITE_AUTHOR,
    sections: [
      {
        id: 'natureza',
        title: '1. Natureza educativa do conteúdo',
        paragraphs: [
          'Não somos instituição financeira, corretora de valores, administradora de fundos, assessoria de investimentos registrada na CVM, escritório de advocacia, contabilidade ou órgão governamental.',
          'Nenhum texto, gráfico, simulação ou FAQ substitui parecer profissional adaptado à sua situação patrimonial, contratual, fiscal ou previdenciária. O conteúdo visa ampliar compreensão de conceitos, não prescindir de due diligence individual.',
        ],
        subsections: [
          {
            id: 'nao-recomendacao',
            title: 'Ausência de recomendação de investimento',
            paragraphs: [
              'Não recomendamos compra, venda ou manutenção de ativos específicos (ações, fundos, criptoativos, imóveis, previdência privada). Menções a classes de ativos ou indicadores (CDI, Selic, IPCA) são ilustrativas e didáticas.',
            ],
          },
        ],
      },
      {
        id: 'calculos',
        title: '2. Limitações dos cálculos e simulações',
        paragraphs: [
          'As calculadoras aplicam modelos matemáticos simplificados com parâmetros fornecidos pelo usuário e dados de referência de fontes públicas. Resultados são estimativas, não garantias de desempenho futuro.',
        ],
        list: [
          'Tributação real pode incluir alíquotas progressivas, come-cotas, isenções específicas e regimes especiais não modelados integralmente',
          'Taxas de administração, performance, spread cambial e custódia podem reduzir retorno líquido',
          'Marcação a mercado altera valor de títulos antes do vencimento',
          'Convenções coletivas, acordos individuais e verbas não previstas na CLT podem mudar rescisões',
          'Regras previdenciárias e benefícios do INSS dependem de tempo de contribuição e legislação vigente',
        ],
        subsections: [
          {
            id: 'dados-mercado',
            title: 'Dados de mercado e APIs',
            paragraphs: [
              'Selic, IPCA, CDI e câmbio são obtidos de APIs públicas quando disponíveis. Em falhas de rede ou indisponibilidade do provedor, valores de fallback ou entrada manual podem ser usados, com possível defasagem temporal. Sempre verifique séries oficiais do Banco Central antes de decisões relevantes.',
            ],
          },
          {
            id: 'arredondamentos',
            title: 'Arredondamentos e precisão',
            paragraphs: [
              'Arredondamentos de centavos, periodicidade de capitalização (mensal vs diária) e convenções de dias úteis podem gerar pequenas diferenças em relação a planilhas bancárias ou sistemas profissionais.',
            ],
          },
        ],
      },
      {
        id: 'decisoes',
        title: '3. Decisões financeiras, trabalhistas e tributárias',
        paragraphs: [
          'Você é exclusivamente responsável pelas decisões tomadas com base nas informações deste site. Não nos responsabilizamos por perdas financeiras, oportunidades perdidas, litígios trabalhistas, autuações fiscais ou danos indiretos.',
          'Antes de migrar de CLT para PJ, resgatar investimentos, assinar contrato de previdência ou aceitar rescisão, consulte profissionais qualificados: CFP para planejamento financeiro, contador para tributos, advogado trabalhista para vínculo empregatício.',
        ],
      },
      {
        id: 'conteudo-legal',
        title: '4. Conteúdo legal e trabalhista simplificado',
        paragraphs: [
          'Explicações sobre CLT, verbas rescisórias, INSS e MEI são resumos didáticos. A legislação e jurisprudência mudam; casos com justa causa, estabilidades, acidentes de trabalho ou contratos internacionais exigem análise especializada.',
          'Não garantimos que nossas interpretações estejam atualizadas no exato momento da sua consulta, embora nos esforcemos por revisões periódicas.',
        ],
      },
      {
        id: 'links',
        title: '5. Links externos e publicidade',
        paragraphs: [
          'Links para sites de terceiros (gov.br, BCB, blogs, anunciantes) são fornecidos por conveniência. Não controlamos conteúdo, disponibilidade ou práticas de privacidade externos.',
          'Anúncios via Google AdSense não representam endosso dos produtos anunciados. Contratos com anunciantes são independentes do editorial do calculojuroscompostos.com.br.',
        ],
      },
      {
        id: 'disponibilidade',
        title: '6. Disponibilidade e segurança',
        paragraphs: [
          'O site pode sofrer interrupções por manutenção, falhas de hospedagem ou eventos de força maior. Não garantimos backup dos seus parâmetros de simulação, pois estes não são armazenados em nossos servidores.',
          'Adotamos boas práticas de segurança, mas nenhum sistema online é totalmente imune a incidentes.',
        ],
      },
      {
        id: 'aceite',
        title: '7. Aceite desta isenção',
        paragraphs: [
          'Ao utilizar o calculojuroscompostos.com.br, você reconhece ter lido esta Isenção de Responsabilidade e compreendido que as ferramentas e textos não constituem assessoria profissional. Em caso de dúvida, priorize fontes oficiais e consultoria qualificada.',
          'O site não dispõe de canal de contato para esclarecimentos; consulte os Termos de Uso, a Política de Privacidade e fontes oficiais citadas.',
        ],
      },
    ],
    faq: [
      {
        question: 'Posso usar o resultado da rescisão em juízo?',
        answer:
          'Não como prova ou cálculo oficial. É estimativa educativa. O valor devido em processo depende de análise jurídica e documentos do contrato.',
      },
      {
        question: 'A simulação de aposentadoria garante minha renda futura?',
        answer:
          'Não. Projeções assumem taxa de retorno e aportes constantes, cenários que raramente ocorrem exatamente na vida real.',
      },
      {
        question: 'Vocês respondem por perdas em investimentos?',
        answer:
          'Não. Não intermediamos investimentos nem recomendamos ativos. Perdas em mercado financeiro são risco do investidor.',
      },
      {
        question: 'E se a taxa Selic no site estiver desatualizada?',
        answer:
          'Pode ocorrer em falhas de API. Confira a série oficial do Banco Central e use entrada manual na calculadora se necessário.',
      },
      {
        question: 'O comparativo CLT vs PJ substitui contador?',
        answer:
          'Não. Simplifica cenários genéricos. Regimes tributários, pró-labore, distribuição de lucros e obrigações acessórias exigem contabilidade profissional.',
      },
      {
        question: 'Onde está a base legal desta isenção?',
        answer:
          'Complementa os Termos de Uso e a legislação civil brasileira sobre limitação de responsabilidade em serviços informativos gratuitos, sem prejuízo de direitos irrenunciáveis do consumidor quando aplicáveis.',
      },
    ],
    glossary: [
      {
        term: 'Estimativa',
        definition: 'Resultado aproximado de um modelo, não valor exato ou garantido.',
      },
      {
        term: 'Due diligence',
        definition: 'Análise cuidadosa e verificação de fatos antes de uma decisão relevante.',
      },
    ],
    sources: [SOURCES.BCB, SOURCES.CVM, SOURCES.CLT, SOURCES.INSS, SOURCES.RECEITA],
    relatedTools: [
      { label: 'Juros Compostos', href: ROUTES.home, description: 'Leia as premissas na página da ferramenta.' },
      { label: 'Rescisão CLT', href: ROUTES.rescisao, description: 'Verbas sujeitas a limitações documentadas.' },
      { label: 'Aposentadoria', href: ROUTES.aposentadoria, description: 'Projeção, não promessa de benefício.' },
      { label: 'Calculadora IPCA', href: ROUTES.calculadoraIpca, description: 'Inflação oficial como referência.' },
    ],
    relatedCategories: [
      { label: 'Investimentos', href: ROUTES.categoria('investimentos') },
      { label: 'Salário e CLT', href: ROUTES.categoria('salario-clt') },
      { label: 'Aposentadoria', href: ROUTES.categoria('aposentadoria') },
    ],
  },
};
