import type { InstitutionalContent } from '../types';
import { ROUTES } from '../../constants/routes';
import { SOURCES } from '../../constants/eeat';

export const INSTITUTIONAL_PAGES: Record<string, InstitutionalContent> = {
  sobre: {
    slug: 'sobre',
    title: 'Sobre o calculojuroscompostos.com',
    h1: 'Sobre o calculojuroscompostos.com',
    metaTitle: 'Sobre Nós | Calculadoras Financeiras Gratuitas e Educação Financeira',
    metaDescription:
      'Conheça o calculojuroscompostos.com: missão, ferramentas gratuitas, metodologia de cálculo, valores editoriais e compromisso com transparência E-E-A-T para investidores e trabalhadores brasileiros.',
    intro:
      'O calculojuroscompostos.com é um portal brasileiro de educação financeira e ferramentas de simulação. Nossa proposta é simples: transformar conceitos complexos — juros compostos, previdência, rescisão trabalhista, tributação de PJ — em números claros, acessíveis e calculados no seu próprio navegador. Não somos banco, corretora ou assessoria de investimentos; somos um projeto editorial independente focado em transparência, privacidade e conteúdo original em português.',
    updatedAt: '2026-06-15',
    author: 'Equipe calculojuroscompostos.com',
    sections: [
      {
        id: 'missao',
        title: 'Nossa missão',
        paragraphs: [
          'Acreditamos que decisões financeiras mais conscientes começam com informação de qualidade e ferramentas que qualquer pessoa consiga usar, sem barreiras de cadastro, pagamento ou exposição desnecessária de dados pessoais.',
          'A missão do calculojuroscompostos.com é democratizar o acesso a simuladores confiáveis e conteúdo educativo sobre finanças pessoais, investimentos, aposentadoria e direitos trabalhistas no contexto brasileiro — sempre com linguagem direta e referências a fontes oficiais quando aplicável.',
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
              'Conteúdo editorial passa por checagem de consistência numérica, alinhamento com fontes oficiais citadas e atualização da data de revisão visível ao leitor. Erros reportados por leitores são priorizados e corrigidos com registro da alteração quando impactam cálculos ou interpretação legal simplificada.',
            ],
          },
        ],
      },
      {
        id: 'eeat',
        title: 'Transparência E-E-A-T',
        paragraphs: [
          'E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) é o conjunto de sinais que buscamos transmitir: experiência prática na elaboração de ferramentas financeiras, expertise em matemática financeira e legislação brasileira aplicável, autoridade baseada em citação de fontes oficiais e confiança através de políticas claras de privacidade, termos de uso e isenção de responsabilidade.',
          'Identificamos o autor editorial como Equipe calculojuroscompostos.com — profissionais com experiência em planejamento financeiro pessoal, normas trabalhistas e educação financeira. Não ocultamos limitações: simulações são modelos, não espelhos perfeitos da realidade tributária ou contratual de cada leitor.',
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
        question: 'O calculojuroscompostos.com é gratuito?',
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
        question: 'Como sugerir uma nova calculadora ou reportar um erro?',
        answer:
          'Envie mensagem para contato@calculojuroscompostos.com com descrição do problema, parâmetros utilizados e captura de tela se possível. Respondemos em até cinco dias úteis.',
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
        href: ROUTES.jurosCompostos,
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

  contato: {
    slug: 'contato',
    title: 'Contato',
    h1: 'Contato',
    metaTitle: 'Contato | calculojuroscompostos.com',
    metaDescription:
      'Fale com a equipe do calculojuroscompostos.com. Dúvidas sobre calculadoras, correções, sugestões e parcerias editoriais. Saiba o que atendemos e o que não fazemos.',
    intro:
      'Estamos disponíveis para ouvir leitores, corrigir informações, avaliar sugestões de ferramentas e responder dúvidas sobre o funcionamento das calculadoras. Utilize o canal abaixo com clareza e sem enviar dados sensíveis desnecessários.',
    updatedAt: '2026-06-15',
    author: 'Equipe calculojuroscompostos.com',
    sections: [
      {
        id: 'canais',
        title: 'Canais de atendimento',
        paragraphs: [
          'O principal canal de comunicação é o e-mail institucional. Não operamos atendimento telefônico, WhatsApp comercial ou chat em tempo real.',
          'E-mail: contato@calculojuroscompostos.com',
          'Prazo de resposta: até 5 dias úteis em dias normais de operação. Mensagens recebidas em feriados ou fins de semana são tratadas no próximo período útil.',
        ],
        subsections: [
          {
            id: 'ao-escrever',
            title: 'Como escrever uma mensagem eficiente',
            paragraphs: [
              'Para dúvidas sobre resultados de cálculo, informe a calculadora utilizada, todos os parâmetros digitados (taxa, prazo, valores), navegador e dispositivo se houver erro técnico. Para sugestões de conteúdo, descreva o problema que a ferramenta ou artigo resolveria.',
              'Não envie senhas, documentos de identidade completos, extratos bancários com dados de terceiros ou informações que não sejam necessárias para entendermos sua solicitação.',
            ],
          },
        ],
      },
      {
        id: 'atendemos',
        title: 'O que atendemos',
        paragraphs: [
          'Respondemos solicitações relacionadas ao uso técnico das calculadoras, reporte de bugs, inconsistências em fórmulas ou textos, sugestões de novas funcionalidades educativas e propostas de parceria editorial (guest posts, citações, correções de especialistas externos com identificação).',
        ],
        list: [
          'Esclarecimento sobre premissas e limitações das simulações',
          'Correção de erros factuais ou de cálculo comprovados',
          'Sugestões de calculadoras ou tópicos para o blog',
          'Questões sobre privacidade, cookies e exercício de direitos LGPD',
          'Propostas de parceria de conteúdo educativo sem conflito de interesse',
        ],
      },
      {
        id: 'nao-atendemos',
        title: 'O que não atendemos',
        paragraphs: [
          'Por limitação de escopo e ausência de habilitação profissional individualizada, não prestamos consultoria financeira personalizada, recomendação de compra ou venda de ativos, parecer jurídico sobre contratos ou processos, elaboração de declarações fiscais ou cálculo oficial de rescisão para fins judiciais.',
          'Não solicitamos pagamento por e-mail nem oferecemos serviços premium de assessoria. Desconfie de mensagens se passando pela nossa equipe em outros canais.',
        ],
        subsections: [
          {
            id: 'profissionais',
            title: 'Quando procurar um profissional',
            paragraphs: [
              'Para decisões com impacto patrimonial, trabalhista ou tributário relevante, consulte CFP (planejamento financeiro), contador (obrigações fiscais), advogado trabalhista (rescisão e vínculo) ou economista/assessor credenciado conforme o caso. Nossas ferramentas ajudam a formular cenários, não a substituir parecer formal.',
            ],
          },
        ],
      },
      {
        id: 'privacidade-contato',
        title: 'Privacidade nas comunicações',
        paragraphs: [
          'E-mails recebidos são utilizados exclusivamente para responder sua solicitação e melhorar o serviço quando aplicável. Não vendemos listas de contato. Retenção limitada ao necessário para histórico de atendimento e obrigações legais. Detalhes completos na Política de Privacidade.',
        ],
      },
    ],
    faq: [
      {
        question: 'Qual o prazo de resposta do e-mail?',
        answer: 'Buscamos responder em até 5 dias úteis. Demandas complexas podem exigir mais tempo; nesse caso, enviamos confirmação de recebimento.',
      },
      {
        question: 'Posso enviar meu caso trabalhista para análise?',
        answer:
          'Não realizamos análise individual de rescisões ou contratos. Use a calculadora de rescisão como referência educativa e procure advogado trabalhista para o seu caso concreto.',
      },
      {
        question: 'Vocês aceitam guest posts pagos?',
        answer:
          'Não publicamos conteúdo patrocinado disfarçado de editorial. Parcerias devem ser transparentes, educativas e compatíveis com nossa política de independência.',
      },
      {
        question: 'Como reportar um erro em uma taxa ou fórmula?',
        answer:
          'Envie e-mail com a URL da página, print do resultado inesperado, parâmetros usados e, se possível, link para fonte oficial que contradiz o valor exibido.',
      },
      {
        question: 'Há atendimento em inglês ou espanhol?',
        answer: 'O site e o atendimento prioritário são em português brasileiro. Mensagens em outros idiomas podem não ser respondidas.',
      },
    ],
    glossary: [
      {
        term: 'LGPD',
        definition:
          'Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018) — regula tratamento de dados pessoais no Brasil.',
      },
      {
        term: 'Bug',
        definition: 'Defeito de software que produz comportamento incorreto ou inesperado em uma calculadora ou página.',
      },
    ],
    sources: [SOURCES.GOV, SOURCES.ANPD],
    relatedTools: [
      { label: 'Juros Compostos', href: ROUTES.jurosCompostos, description: 'Ferramenta mais utilizada do site.' },
      { label: 'Rescisão CLT', href: ROUTES.rescisao, description: 'Dúvidas frequentes sobre verbas rescisórias.' },
    ],
    relatedCategories: [
      { label: 'Salário e CLT', href: ROUTES.categoria('salario-clt') },
      { label: 'Empreendedorismo', href: ROUTES.categoria('empreendedorismo') },
    ],
  },

  privacidade: {
    slug: 'privacidade',
    title: 'Política de Privacidade',
    h1: 'Política de Privacidade',
    metaTitle: 'Política de Privacidade e LGPD | calculojuroscompostos.com',
    metaDescription:
      'Política de privacidade em conformidade com a LGPD: dados coletados, cookies, Google AdSense, direitos do titular e tratamento de informações no calculojuroscompostos.com.',
    intro:
      'Esta Política de Privacidade descreve como o calculojuroscompostos.com trata dados pessoais e informações de navegação, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018). Ao utilizar o site, você declara ter lido e compreendido este documento. Recomendamos também a leitura da Política de Cookies e dos Termos de Uso.',
    updatedAt: '2026-06-15',
    author: 'Equipe calculojuroscompostos.com',
    sections: [
      {
        id: 'controlador',
        title: '1. Controlador e escopo',
        paragraphs: [
          'O controlador dos dados pessoais tratados neste site é o responsável editorial pelo calculojuroscompostos.com, identificável pelo e-mail contato@calculojuroscompostos.com.',
          'Esta política aplica-se ao uso do site, das calculadoras, páginas institucionais, blog e quaisquer formulários ou canais de comunicação vinculados ao domínio. Não se aplica a sites de terceiros acessados por links externos.',
        ],
      },
      {
        id: 'dados-calculadoras',
        title: '2. Dados das calculadoras (processamento local)',
        paragraphs: [
          'As calculadoras financeiras e trabalhistas operam predominantemente no navegador do usuário (processamento client-side). Valores inseridos — capital inicial, salários, prazos, taxas, benefícios — não são enviados, armazenados ou processados em servidores do calculojuroscompostos.com para fins de simulação.',
          'Isso significa que não mantemos histórico dos seus cálculos nem perfil financeiro derivado do uso das ferramentas. Qualquer dado que permaneça após fechar a página está apenas no seu dispositivo (por exemplo, cache do navegador ou armazenamento local, se implementado em versões futuras — será documentado aqui).',
        ],
        subsections: [
          {
            id: 'excecao-apis',
            title: 'Consultas a APIs de taxas',
            paragraphs: [
              'Algumas ferramentas consultam APIs públicas (Banco Central, serviços de cotação) apenas para obter taxas de mercado atualizadas. Essas requisições não incluem os valores financeiros que você digitou nas calculadoras; transmitem somente parâmetros técnicos necessários à consulta da série ou cotação.',
            ],
          },
        ],
      },
      {
        id: 'dados-coletados',
        title: '3. Dados que podemos coletar',
        paragraphs: [
          'Além do processamento local descrito acima, podemos tratar categorias limitadas de dados quando você navega no site, interage com anúncios ou nos contacta por e-mail.',
        ],
        list: [
          'Dados de navegação — endereço IP, tipo de navegador, páginas visitadas, tempo de permanência, origem do tráfego (referrer), de forma agregada ou pseudonimizada.',
          'Dados de cookies e tecnologias similares — identificadores para publicidade, medição de audiência e preferências (ver Política de Cookies).',
          'Dados de contato — endereço de e-mail e conteúdo da mensagem quando você nos escreve voluntariamente.',
          'Dados técnicos de segurança — logs de servidor para prevenção de abuso, ataques e diagnóstico de falhas, com retenção limitada.',
        ],
        subsections: [
          {
            id: 'nao-coletamos',
            title: 'Dados que não coletamos intencionalmente',
            paragraphs: [
              'Não solicitamos CPF, dados bancários, senhas, números de cartão ou informações de saúde. Não exigimos cadastro para uso das calculadoras. Não vendemos bases de dados de usuários a terceiros.',
            ],
          },
        ],
      },
      {
        id: 'finalidades',
        title: '4. Finalidades e bases legais (LGPD)',
        paragraphs: [
          'Tratamos dados pessoais com base nas hipóteses legais da LGPD, conforme a finalidade:',
        ],
        list: [
          'Exibição e funcionamento do site — execução de contrato ou procedimentos preliminares e legítimo interesse.',
          'Publicidade (Google AdSense) — consentimento quando exigido para cookies não essenciais, ou legítimo interesse conforme configuração e jurisprudência aplicável.',
          'Medição de audiência — estatísticas agregadas para melhoria editorial, com base em legítimo interesse ou consentimento.',
          'Atendimento por e-mail — execução de procedimentos a pedido do titular ou legítimo interesse em responder comunicações.',
          'Segurança e conformidade — legítimo interesse e cumprimento de obrigação legal.',
        ],
        subsections: [
          {
            id: 'consentimento',
            title: 'Consentimento e revogação',
            paragraphs: [
              'Quando o tratamento depender de consentimento (especialmente cookies de publicidade e analytics em jurisdições ou configurações que o exijam), você poderá gerenciá-lo pelo banner de cookies, configurações do navegador ou painel de preferências do Google. A revogação não afeta tratamentos realizados anteriormente com base legal válida.',
            ],
          },
        ],
      },
      {
        id: 'cookies-adsense',
        title: '5. Cookies, Google AdSense e terceiros',
        paragraphs: [
          'Utilizamos cookies e tecnologias similares para operar o site, medir tráfego e exibir anúncios. O Google AdSense e seus parceiros podem usar cookies para veicular anúncios com base em visitas anteriores ao nosso site e a outros sites da rede de display do Google.',
          'O uso de cookies de publicidade permite personalização de anúncios. Você pode desativar a personalização em: https://www.google.com/settings/ads. Para mais detalhes sobre tipos de cookies, prazos e gestão, consulte nossa Política de Cookies.',
        ],
        subsections: [
          {
            id: 'google-parceiros',
            title: 'Fornecedores e transferência internacional',
            paragraphs: [
              'Prestadores como Google (EUA e outras jurisdições) podem processar dados como operadores ou controladores independentes conforme seus termos. A transferência internacional pode ocorrer com base em cláusulas contratuais padrão, decisões de adequação ou outros mecanismos previstos na LGPD. Consulte a política de privacidade do Google para detalhes: https://policies.google.com/privacy',
            ],
          },
        ],
      },
      {
        id: 'direitos-titular',
        title: '6. Direitos do titular de dados',
        paragraphs: [
          'Nos termos da LGPD, você pode solicitar, mediante requisição ao controlador:',
        ],
        list: [
          'Confirmação da existência de tratamento e acesso aos dados',
          'Correção de dados incompletos, inexatos ou desatualizados',
          'Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade',
          'Portabilidade, quando aplicável',
          'Eliminação dos dados tratados com consentimento, observadas retenções legais',
          'Informação sobre compartilhamento com terceiros',
          'Revogação do consentimento',
          'Oposição a tratamento baseado em legítimo interesse, quando cabível',
        ],
        subsections: [
          {
            id: 'como-exercer',
            title: 'Como exercer seus direitos',
            paragraphs: [
              'Envie pedido para contato@calculojuroscompostos.com com assunto "LGPD — direitos do titular", identificação mínima para localizar registros (e-mail usado no contato) e descrição do direito que deseja exercer. Responderemos no prazo legal, podendo solicitar informações adicionais para evitar fraudes.',
              'Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD) se entender que o tratamento viola a legislação.',
            ],
          },
        ],
      },
      {
        id: 'retencao-seguranca',
        title: '7. Retenção, segurança e incidentes',
        paragraphs: [
          'Mantemos dados pessoais apenas pelo tempo necessário às finalidades descritas ou exigido por lei. E-mails de atendimento podem ser arquivados por período razoável para histórico de suporte. Logs de servidor são rotacionados periodicamente.',
          'Adotamos medidas técnicas e organizacionais proporcionais ao risco: HTTPS, controle de acesso a infraestrutura, atualização de dependências. Nenhum sistema é 100% seguro; em caso de incidente relevante que afete seus direitos, comunicaremos conforme exigências legais.',
        ],
      },
      {
        id: 'menores-alteracoes',
        title: '8. Crianças, alterações e contato',
        paragraphs: [
          'O site destina-se ao público em geral com interesse em finanças e não é direcionado a menores de 18 anos de forma específica. Não coletamos intencionalmente dados de crianças.',
          'Esta política pode ser atualizada a qualquer momento. A data da última revisão consta no cabeçalho editorial. Alterações substanciais podem ser destacadas no site. O uso continuado após publicação implica ciência da versão vigente.',
          'Dúvidas sobre privacidade: contato@calculojuroscompostos.com.',
        ],
      },
    ],
    faq: [
      {
        question: 'Vocês armazenam o que eu digito nas calculadoras?',
        answer:
          'Não. Os cálculos são feitos no seu navegador e os valores inseridos não são enviados aos nossos servidores para simulação.',
      },
      {
        question: 'Como desativo cookies de publicidade?',
        answer:
          'Use as configurações do navegador, nosso banner de cookies (quando disponível) ou o painel de anúncios do Google em google.com/settings/ads.',
      },
      {
        question: 'Qual a base legal para exibir anúncios?',
        answer:
          'Depende da configuração: consentimento para cookies não essenciais quando aplicável, e/ou legítimo interesse na monetização do serviço gratuito, sempre respeitando a LGPD.',
      },
      {
        question: 'Posso pedir exclusão dos meus dados?',
        answer:
          'Sim, quando houver dados pessoais sob nosso controle (ex.: e-mail de contato). Envie solicitação para contato@calculojuroscompostos.com. Dados agregados de analytics podem não permitir identificação individual.',
      },
      {
        question: 'O site usa Google Analytics?',
        answer:
          'Podemos utilizar ferramentas de medição de audiência. A configuração exata e cookies empregados estão detalhados na Política de Cookies, atualizada junto com esta política.',
      },
      {
        question: 'Como entro em contato com a ANPD?',
        answer:
          'Acesse o site oficial da Autoridade Nacional de Proteção de Dados (gov.br/anpd) para orientações sobre reclamações e procedimentos.',
      },
    ],
    glossary: [],
    sources: [SOURCES.ANPD, SOURCES.GOV],
    relatedTools: [
      { label: 'Juros Compostos', href: ROUTES.jurosCompostos, description: 'Cálculo 100% local no navegador.' },
    ],
    relatedCategories: [
      { label: 'Finanças Pessoais', href: ROUTES.categoria('financas-pessoais') },
    ],
  },

  termos: {
    slug: 'termos',
    title: 'Termos de Uso',
    h1: 'Termos de Uso',
    metaTitle: 'Termos de Uso | calculojuroscompostos.com',
    metaDescription:
      'Termos de uso do calculojuroscompostos.com: condições de acesso, uso permitido, propriedade intelectual, limitações de responsabilidade e disposições gerais.',
    intro:
      'Estes Termos de Uso regulam o acesso e a utilização do site calculojuroscompostos.com, incluindo calculadoras, blog e páginas institucionais. Ao acessar ou usar o site, você concorda integralmente com estes termos. Se não concordar, interrompa o uso imediatamente.',
    updatedAt: '2026-06-15',
    author: 'Equipe calculojuroscompostos.com',
    sections: [
      {
        id: 'aceitacao',
        title: '1. Aceitação e capacidade',
        paragraphs: [
          'O uso do site constitui aceitação eletrônica destes Termos, da Política de Privacidade, da Política de Cookies e da Isenção de Responsabilidade, que integram o acordo entre você e o calculojuroscompostos.com.',
          'Você declara ter capacidade civil para contratar ou utilizar o site sob supervisão de responsável legal. O conteúdo é informativo e não direcionado a menores sem orientação de adultos.',
        ],
      },
      {
        id: 'objeto',
        title: '2. Objeto do serviço',
        paragraphs: [
          'O calculojuroscompostos.com oferece ferramentas de simulação matemática, artigos educativos e material de referência sobre finanças pessoais, investimentos, aposentadoria e temas trabalhistas no Brasil.',
          'O serviço é fornecido "no estado em que se encontra" (as is), sem garantia de disponibilidade ininterrupta, ausência total de erros ou adequação a um propósito específico além do caráter educativo declarado.',
        ],
      },
      {
        id: 'uso-permitido',
        title: '3. Uso permitido e proibições',
        paragraphs: [
          'É permitido o uso pessoal, educativo e não comercial do site, respeitando estes termos e a legislação brasileira aplicável.',
        ],
        list: [
          'Utilizar as calculadoras para planejamento pessoal e estudo',
          'Citar trechos do conteúdo com atribuição e link para a fonte original',
          'Compartilhar links de páginas nas redes sociais',
        ],
        subsections: [
          {
            id: 'proibicoes',
            title: 'Condutas proibidas',
            paragraphs: [
              'É vedado, sem autorização prévia por escrito: reproduzir comercialmente grandes volumes do site; realizar scraping automatizado agressivo que degrade a infraestrutura; tentar acessar áreas restritas, código-fonte ou servidores; distribuir malware; usar o site para spam ou práticas enganosas; remover avisos de direitos autorais; ou se passar pelo calculojuroscompostos.com em outros canais.',
            ],
          },
        ],
      },
      {
        id: 'nao-assessoria',
        title: '4. Ausência de assessoria profissional',
        paragraphs: [
          'Nada neste site constitui oferta de valores mobiliários, recomendação de investimento personalizada, consultoria jurídica, contábil ou tributária. Não somos instituição financeira autorizada pela CVM nem escritório de advocacia.',
          'Resultados de calculadoras são estimativas baseadas em parâmetros informados pelo usuário e premissas documentadas. Decisões financeiras, trabalhistas ou fiscais devem ser validadas com profissionais habilitados.',
        ],
      },
      {
        id: 'propriedade',
        title: '5. Propriedade intelectual',
        paragraphs: [
          'Textos originais, design, logotipos, código-fonte proprietário e compilação editorial são protegidos por direitos autorais e pertencem ao calculojuroscompostos.com ou licenciadores, salvo indicação em contrário.',
          'Fórmulas matemáticas financeiras de domínio público, dados oficiais de órgãos governamentais e citações de fontes externas não são de nossa propriedade exclusiva. O uso de marcas de terceiros é apenas identificativo quando necessário.',
        ],
        subsections: [
          {
            id: 'licenca-usuario',
            title: 'Licença limitada ao usuário',
            paragraphs: [
              'Concedemos licença revogável, não exclusiva e intransferível para acessar e usar o site conforme estes termos. Não implica cessão de direitos de propriedade intelectual.',
            ],
          },
        ],
      },
      {
        id: 'links-terceiros',
        title: '6. Links e conteúdo de terceiros',
        paragraphs: [
          'O site pode conter links para páginas externas (órgãos governamentais, Google, parceiros de publicidade). Não controlamos nem endossamos conteúdo, políticas de privacidade ou práticas de terceiros. O acesso é por sua conta e risco.',
        ],
      },
      {
        id: 'publicidade',
        title: '7. Publicidade',
        paragraphs: [
          'Anúncios exibidos via Google AdSense ou outros programas são de responsabilidade dos anunciantes e da rede de publicidade. A presença de anúncio não implica endosso editorial do produto ou serviço anunciado.',
        ],
      },
      {
        id: 'limitacao',
        title: '8. Limitação de responsabilidade',
        paragraphs: [
          'Na máxima extensão permitida pela lei aplicável, o calculojuroscompostos.com, seus editores e colaboradores não serão responsáveis por danos diretos, indiretos, incidentais, lucros cessantes ou perdas decorrentes do uso ou impossibilidade de uso do site, de decisões tomadas com base em simulações ou de imprecisões em dados de terceiros.',
          'Algumas jurisdições não permitem exclusões amplas; nesses casos, a limitação aplica-se na medida máxima legal.',
        ],
      },
      {
        id: 'indenizacao',
        title: '9. Indenização',
        paragraphs: [
          'Você concorda em indenizar e isentar o calculojuroscompostos.com de reclamações, perdas e despesas (incluindo honorários advocatícios razoáveis) decorrentes de violação destes termos ou uso indevido do site por você.',
        ],
      },
      {
        id: 'gerais',
        title: '10. Disposições gerais',
        paragraphs: [
          'Podemos alterar estes Termos a qualquer momento, publicando a versão atualizada com nova data de revisão. O uso continuado após alterações constitui aceitação.',
          'A invalidade de uma cláusula não afeta as demais. A tolerância quanto a descumprimento não implica renúncia. Estes termos são regidos pelas leis da República Federativa do Brasil. Foro competente: comarca do domicílio do controlador do site, salvo disposição legal imperativa em favor do consumidor.',
          'Contato: contato@calculojuroscompostos.com.',
        ],
      },
    ],
    faq: [
      {
        question: 'Posso copiar textos do blog para meu site?',
        answer:
          'Citações curtas com atribuição e link são aceitáveis. Reprodução integral ou republicação comercial exige autorização prévia.',
      },
      {
        question: 'O uso das calculadoras cria algum contrato de assessoria?',
        answer: 'Não. O uso é gratuito e educativo, sem relação de prestação de serviços profissionais individualizados.',
      },
      {
        question: 'Vocês podem banir meu acesso?',
        answer:
          'Podemos restringir acesso em caso de abuso, ataques automatizados ou violação destes termos, sem prejuízo de medidas legais.',
      },
      {
        question: 'Os termos se aplicam a versões futuras do site?',
        answer: 'Sim, salvo disposição expressa em contrário na versão atualizada publicada online.',
      },
      {
        question: 'Onde está a isenção de responsabilidade detalhada?',
        answer: 'Na página dedicada de Isenção de Responsabilidade, complementar a estes Termos de Uso.',
      },
    ],
    glossary: [],
    sources: [SOURCES.GOV, SOURCES.CVM],
    relatedTools: [
      { label: 'Juros Compostos', href: ROUTES.jurosCompostos, description: 'Sujeita às limitações destes termos.' },
      { label: 'CLT vs PJ', href: ROUTES.cltPj, description: 'Simulação educativa, não parecer fiscal.' },
    ],
  },

  cookies: {
    slug: 'cookies',
    title: 'Política de Cookies',
    h1: 'Política de Cookies',
    metaTitle: 'Política de Cookies | calculojuroscompostos.com',
    metaDescription:
      'Política de cookies do calculojuroscompostos.com: tipos, finalidades, Google AdSense, prazos, gestão de preferências e bases legais conforme LGPD.',
    intro:
      'Esta Política de Cookies explica o que são cookies, quais utilizamos no calculojuroscompostos.com, para quais finalidades e como você pode gerenciá-los. Complementa nossa Política de Privacidade e deve ser lida em conjunto com ela.',
    updatedAt: '2026-06-15',
    author: 'Equipe calculojuroscompostos.com',
    sections: [
      {
        id: 'o-que-sao',
        title: '1. O que são cookies',
        paragraphs: [
          'Cookies são pequenos arquivos de texto armazenados no seu dispositivo (computador, tablet ou smartphone) quando você visita um site. Permitem que o site reconheça o navegador, lembre preferências, meça audiência ou exiba publicidade relevante.',
          'Tecnologias similares incluem pixels de rastreamento, armazenamento local (localStorage), identificadores de publicidade em aplicativos e impressões digitais de navegador (fingerprinting) — quando empregadas por terceiros, seguem regras descritas nesta política na medida de nosso conhecimento.',
        ],
      },
      {
        id: 'tipos',
        title: '2. Tipos de cookies que utilizamos',
        paragraphs: [
          'Classificamos os cookies por finalidade e origem. A lista pode evoluir conforme ferramentas de analytics ou publicidade forem habilitadas ou atualizadas.',
        ],
        subsections: [
          {
            id: 'essenciais',
            title: 'Cookies estritamente necessários',
            paragraphs: [
              'Essenciais para funcionamento básico: segurança, balanceamento de carga, preferência de consentimento de cookies (quando exibimos banner) e sessão técnica. Geralmente não exigem consentimento prévio por serem indispensáveis ao serviço solicitado.',
            ],
          },
          {
            id: 'publicidade',
            title: 'Cookies de publicidade (Google AdSense)',
            paragraphs: [
              'Utilizados para exibir anúncios, limitar frequência de exibição, medir desempenho de campanhas e personalizar anúncios com base em interesses inferidos de navegação neste e em outros sites da rede Google.',
              'O Google e parceiros certificados podem definir cookies como _gads, IDE (DoubleClick) e similares. Política do Google: https://policies.google.com/technologies/ads',
            ],
          },
          {
            id: 'analytics',
            title: 'Cookies de analytics e desempenho',
            paragraphs: [
              'Medem páginas visitadas, origem do tráfego, tempo de sessão e erros de forma agregada ou pseudonimizada para melhorar conteúdo e desempenho técnico. Quando configurados para exigir consentimento, só são ativados após sua escolha no banner.',
            ],
          },
          {
            id: 'funcionais',
            title: 'Cookies funcionais',
            paragraphs: [
              'Lembram preferências opcionais como tema ou idioma, se disponíveis em versões futuras do site. Não são obrigatórios para o uso das calculadoras.',
            ],
          },
        ],
      },
      {
        id: 'terceiros',
        title: '3. Cookies de terceiros',
        paragraphs: [
          'Terceiros — principalmente Google (AdSense, Analytics quando habilitado) — podem definir cookies ao carregar scripts em nossas páginas. Não controlamos integralmente esses cookies; recomendamos consultar as políticas dos respectivos fornecedores.',
          'Incorporações futuras (vídeos, widgets sociais) podem adicionar cookies adicionais; esta política será atualizada quando novas integrações forem implementadas.',
        ],
      },
      {
        id: 'bases-legais',
        title: '4. Bases legais e consentimento (LGPD)',
        paragraphs: [
          'Cookies essenciais baseiam-se em legítimo interesse ou execução do serviço. Cookies de publicidade e analytics não essenciais, quando aplicável, baseiam-se em consentimento obtido via banner ou configuração equivalente, conforme orientações da ANPD e melhores práticas de mercado.',
          'Você pode retirar ou alterar o consentimento a qualquer momento sem prejudicar o acesso às calculadoras, embora a experiência publicitária e nossa capacidade de medir audiência possam ser afetadas.',
        ],
      },
      {
        id: 'gerenciar',
        title: '5. Como gerenciar cookies',
        paragraphs: [
          'Você dispõe de várias opções para controlar cookies:',
        ],
        list: [
          'Banner ou painel de preferências no site (quando disponível)',
          'Configurações do navegador — bloquear, excluir ou alertar sobre cookies (Chrome, Firefox, Safari, Edge)',
          'Painel de anúncios Google — https://www.google.com/settings/ads',
          'Extensões de privacidade e modo de navegação anônima (limitações variam)',
        ],
        subsections: [
          {
            id: 'consequencias',
            title: 'Consequências do bloqueio',
            paragraphs: [
              'Bloquear todos os cookies pode impedir funcionalidades como lembrar sua escolha de consentimento ou causar exibição repetitiva de banners. As calculadoras continuam funcionando localmente na maioria dos cenários.',
            ],
          },
        ],
      },
      {
        id: 'prazos',
        title: '6. Prazos de retenção',
        paragraphs: [
          'Cookies de sessão expiram ao fechar o navegador. Cookies persistentes permanecem por períodos definidos pelo emissor — frequentemente de 30 dias a 24 meses para publicidade e analytics. Consulte as ferramentas de desenvolvedor do navegador (aba Application / Armazenamento) para inspecionar cookies ativos no momento da visita.',
        ],
      },
      {
        id: 'atualizacoes',
        title: '7. Atualizações e contato',
        paragraphs: [
          'Esta política pode ser revisada para refletir mudanças tecnológicas ou regulatórias. Data da última atualização no cabeçalho editorial.',
          'Dúvidas: contato@calculojuroscompostos.com com assunto "Cookies".',
        ],
      },
    ],
    faq: [
      {
        question: 'Preciso aceitar cookies para usar as calculadoras?',
        answer:
          'Não para o cálculo em si, que é local. Cookies de publicidade ou analytics podem ser gerenciados conforme suas preferências.',
      },
      {
        question: 'O Google AdSense usa meus dados financeiros das calculadoras?',
        answer:
          'Não. Os valores que você digita nas simulações não são enviados aos nossos servidores. Cookies de publicidade refletem navegação web, não entradas das calculadoras.',
      },
      {
        question: 'Como excluo todos os cookies do site?',
        answer:
          'Nas configurações de privacidade do navegador, busque por cookies do domínio calculojuroscompostos.com e exclua. Isso pode resetar preferências salvas.',
      },
      {
        question: 'Vocês usam cookies de redes sociais?',
        answer:
          'Atualmente não incorporamos widgets sociais que definam cookies. Se isso mudar, atualizaremos esta política.',
      },
      {
        question: 'O que é cookie de terceiros?',
        answer:
          'É definido por domínio diferente do nosso (ex.: google.com), geralmente por scripts de publicidade ou analytics carregados na página.',
      },
    ],
    glossary: [
      {
        term: 'Cookie de sessão',
        definition: 'Expira ao encerrar o navegador; usado para manter estado temporário da visita.',
      },
      {
        term: 'Cookie persistente',
        definition: 'Permanece no dispositivo até data de expiração ou exclusão manual.',
      },
      {
        term: 'AdSense',
        definition: 'Programa de publicidade do Google que exibe anúncios em sites parceiros.',
      },
    ],
    sources: [SOURCES.ANPD, SOURCES.GOV],
    relatedTools: [
      { label: 'Calculadora CDI', href: ROUTES.calculadoraCdi, description: 'Funciona sem envio de dados de simulação.' },
    ],
  },

  isencao: {
    slug: 'isencao',
    title: 'Isenção de Responsabilidade',
    h1: 'Isenção de Responsabilidade',
    metaTitle: 'Isenção de Responsabilidade | calculojuroscompostos.com',
    metaDescription:
      'Isenção de responsabilidade do calculojuroscompostos.com: limitações das calculadoras, conteúdo educativo, decisões financeiras e trabalhistas, dados de mercado e links externos.',
    intro:
      'O calculojuroscompostos.com publica ferramentas e conteúdo com finalidade exclusivamente educativa e informativa. Esta página detalha os limites de nossa responsabilidade e os riscos inerentes ao uso de simulações e artigos sem assessoria profissional personalizada. Leia também os Termos de Uso e, quando aplicável, consulte profissionais habilitados.',
    updatedAt: '2026-06-15',
    author: 'Equipe calculojuroscompostos.com',
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
          'Anúncios via Google AdSense não representam endosso dos produtos anunciados. Contratos com anunciantes são independentes do editorial do calculojuroscompostos.com.',
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
          'Ao utilizar o calculojuroscompostos.com, você reconhece ter lido esta Isenção de Responsabilidade e compreendido que as ferramentas e textos não constituem assessoria profissional. Em caso de dúvida, priorize fontes oficiais e consultoria qualificada.',
          'Contato para esclarecimentos sobre o escopo educativo: contato@calculojuroscompostos.com.',
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
      { label: 'Juros Compostos', href: ROUTES.jurosCompostos, description: 'Leia as premissas na página da ferramenta.' },
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
