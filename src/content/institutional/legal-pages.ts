import type { InstitutionalContent } from '../types';
import { ROUTES } from '../../constants/routes';
import { SOURCES } from '../../constants/eeat';
import { SITE_DOMAIN, SITE_AUTHOR } from '../../constants/site';

const UPDATED = '2026-06-16';

export const LEGAL_PRIVACIDADE: InstitutionalContent = {
  slug: 'privacidade',
  title: 'Política de Privacidade',
  h1: 'Política de Privacidade',
  metaTitle: `Política de Privacidade e LGPD | ${SITE_DOMAIN}`,
  metaDescription: `Como o ${SITE_DOMAIN} trata dados pessoais: calculadoras locais, cookies, publicidade, APIs de terceiros, direitos do titular e conformidade com a LGPD.`,
  intro: `Esta Política de Privacidade descreve como o ${SITE_DOMAIN} trata dados pessoais e informações de navegação, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018). O site opera como ferramenta educativa gratuita, sem cadastro, sem canal de atendimento ao usuário e sem coleta dos valores inseridos nas calculadoras. Ao utilizar o site, você declara ter lido esta política, a Política de Cookies e os Termos de Uso.`,
  updatedAt: UPDATED,
  author: SITE_AUTHOR,
  sections: [
    {
      id: 'controlador',
      title: '1. Controlador, operador e escopo',
      paragraphs: [
        `O controlador dos dados pessoais eventualmente tratados no âmbito deste site é o responsável editorial pelo ${SITE_DOMAIN}, titular do projeto de educação financeira disponibilizado neste domínio.`,
        `Esta política aplica-se exclusivamente ao uso do ${SITE_DOMAIN}, incluindo calculadoras, blog, páginas institucionais e recursos acessados por este endereço. Não se aplica a sites, aplicativos ou serviços de terceiros acessados por links externos, nem aos tratamentos realizados por esses terceiros como controladores independentes.`,
        `O site não dispõe de formulário de contato, chat, área logada ou canal de suporte. Portanto, não solicitamos nem tratamos dados enviados voluntariamente por mensagens direcionadas ao operador.`,
      ],
    },
    {
      id: 'natureza-servico',
      title: '2. Natureza do serviço e dados que não coletamos',
      paragraphs: [
        `O ${SITE_DOMAIN} oferece simuladores financeiros e conteúdo educativo. As calculadoras executam os cálculos no navegador do usuário (processamento client-side). Os valores que você digita — capital, salários, prazos, taxas, benefícios, parâmetros de simulação — não são transmitidos, armazenados ou processados em servidores do ${SITE_DOMAIN} para fins de simulação.`,
        `Não mantemos histórico dos seus cálculos, perfil financeiro, carteira de investimentos ou qualquer base de dados derivada do uso das ferramentas. Após fechar a página, os parâmetros informados permanecem apenas no seu dispositivo, na medida em que o navegador mantenha cache ou armazenamento local.`,
      ],
      list: [
        'Não exigimos cadastro, login ou criação de conta',
        'Não solicitamos CPF, dados bancários, senhas ou documentos',
        'Não vendemos, alugamos ou comercializamos bases de dados de usuários',
        'Não prestamos assessoria individualizada nem armazenamos solicitações de suporte',
      ],
      subsections: [
        {
          id: 'localstorage-cambio',
          title: 'Armazenamento local de cotações',
          paragraphs: [
            'O conversor de moedas pode gravar no localStorage do navegador uma cópia em cache das taxas de câmbio obtidas de APIs públicas, com validade limitada (aproximadamente 30 minutos), para reduzir requisições repetidas. Esse cache contém apenas cotações de mercado, não os valores financeiros que você simula nas calculadoras.',
            'Você pode apagar esse cache a qualquer momento nas configurações de privacidade do navegador ou limpando dados do site.',
          ],
        },
      ],
    },
    {
      id: 'dados-terceiros',
      title: '3. Dados de terceiros e o que não nos pertence',
      paragraphs: [
        `Grande parte das informações exibidas no site provém de fontes externas sobre as quais não temos propriedade nem controle editorial pleno. Isso inclui, sem limitação:`,
      ],
      list: [
        'Séries econômicas oficiais (Selic, IPCA e correlatas) do Banco Central do Brasil',
        'Cotações de moedas obtidas via APIs públicas (incluindo mirrors em CDNs como jsDelivr)',
        'Conteúdo, políticas e cookies definidos pelo Google e parceiros de publicidade (AdSense)',
        'Normas, dados estatísticos e publicações de órgãos governamentais citados como referência',
        'Marcas, logotipos e denominações de instituições financeiras mencionadas de forma identificativa',
      ],
      subsections: [
        {
          id: 'apis-taxas',
          title: 'Consultas automáticas a APIs de taxas',
          paragraphs: [
            'Algumas ferramentas consultam APIs públicas apenas para obter taxas de mercado atualizadas. Essas requisições não incluem os valores financeiros digitados nas calculadoras; limitam-se a parâmetros técnicos da consulta (série, moeda, endpoint).',
            'A disponibilidade, precisão, defasagem temporal e continuidade dessas APIs são de responsabilidade dos respectivos provedores. Quando indisponíveis, o site pode utilizar último valor em cache local ou permitir entrada manual, com aviso ao usuário.',
          ],
        },
        {
          id: 'nao-responsabilidade-terceiros',
          title: 'Limitação quanto a terceiros',
          paragraphs: [
            `O ${SITE_DOMAIN} não responde pelo tratamento de dados realizado por Google, hospedeiros, redes de anúncios, CDNs ou órgãos públicos linkados. Recomendamos consultar as políticas de privacidade desses agentes quando utilizar recursos que dependam deles.`,
          ],
        },
      ],
    },
    {
      id: 'dados-coletados',
      title: '4. Dados que podemos tratar automaticamente',
      paragraphs: [
        'Mesmo sem cadastro, o acesso web pode gerar tratamento limitado de dados técnicos e de navegação, conforme descrito abaixo.',
      ],
      list: [
        'Endereço IP, user-agent, idioma, resolução de tela e páginas visitadas — logs de servidor e ferramentas de medição, quando habilitadas',
        'Origem do tráfego (referrer) e interações agregadas com anúncios',
        'Cookies e tecnologias similares — ver Política de Cookies',
        'Dados técnicos de segurança — prevenção de abuso, ataques e diagnóstico de falhas, com retenção limitada',
      ],
    },
    {
      id: 'finalidades',
      title: '5. Finalidades e bases legais (LGPD)',
      paragraphs: ['Tratamos dados pessoais, quando aplicável, com fundamento nas hipóteses da LGPD:'],
      list: [
        'Funcionamento e segurança do site — legítimo interesse e execução de procedimentos preliminares',
        'Publicidade (Google AdSense) — consentimento quando exigido para cookies não essenciais, ou legítimo interesse conforme configuração',
        'Medição de audiência agregada — legítimo interesse ou consentimento, conforme ferramentas ativas',
        'Cumprimento de obrigações legais e resposta a autoridades competentes',
      ],
      subsections: [
        {
          id: 'consentimento',
          title: 'Consentimento e revogação',
          paragraphs: [
            'Quando o tratamento depender de consentimento (especialmente cookies de publicidade), você pode gerenciá-lo pelo banner de cookies, configurações do navegador ou painel de preferências do Google. A revogação não invalida tratamentos anteriores realizados com base legal válida.',
          ],
        },
      ],
    },
    {
      id: 'cookies-adsense',
      title: '6. Cookies, publicidade e transferência internacional',
      paragraphs: [
        'Utilizamos cookies e tecnologias similares para operar o site, medir tráfego e exibir anúncios. O Google AdSense e parceiros certificados podem definir cookies para veicular anúncios, limitar frequência e medir desempenho.',
        'A personalização de anúncios pode ser desativada em https://www.google.com/settings/ads. Detalhes sobre tipos, prazos e gestão estão na Política de Cookies.',
        'Prestadores como Google podem processar dados nos Estados Unidos ou em outras jurisdições, com base em cláusulas contratuais, decisões de adequação ou mecanismos previstos na LGPD. Consulte https://policies.google.com/privacy',
      ],
    },
    {
      id: 'direitos-titular',
      title: '7. Direitos do titular de dados',
      paragraphs: [
        'Nos termos da LGPD, o titular pode solicitar, quando couber e houver dados sob nosso controle:',
      ],
      list: [
        'Confirmação da existência de tratamento e acesso aos dados',
        'Correção de dados incompletos, inexatos ou desatualizados',
        'Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade',
        'Portabilidade, quando aplicável',
        'Eliminação de dados tratados com consentimento, observadas retenções legais',
        'Informação sobre compartilhamento com terceiros',
        'Revogação do consentimento',
        'Oposição a tratamento baseado em legítimo interesse, quando cabível',
      ],
      subsections: [
        {
          id: 'como-exercer',
          title: 'Como exercer seus direitos sem canal de contato',
          paragraphs: [
            `Como o ${SITE_DOMAIN} não mantém formulário de contato nem atendimento por e-mail, a maior parte dos dados tratados limita-se a cookies de terceiros e logs técnicos pseudonimizados. Para cookies de publicidade e analytics, utilize as ferramentas de opt-out do Google e as configurações do seu navegador.`,
            'Para dados eventualmente retidos em logs de infraestrutura de forma identificável, o titular pode apresentar reclamação ou solicitar providências junto à Autoridade Nacional de Proteção de Dados (ANPD), conforme orientações em gov.br/anpd, indicando o domínio acessado e descrevendo o tratamento questionado.',
            'Quando o tratamento for de responsabilidade exclusiva de terceiros (Google, provedores de CDN, APIs públicas), os pedidos de acesso, correção ou exclusão devem ser direcionados a esses controladores conforme suas políticas.',
          ],
        },
      ],
    },
    {
      id: 'retencao-seguranca',
      title: '8. Retenção, segurança e incidentes',
      paragraphs: [
        'Mantemos dados pessoais apenas pelo tempo necessário às finalidades descritas ou exigido por lei. Logs de servidor são rotacionados periodicamente.',
        'Adotamos medidas proporcionais ao risco: HTTPS, controle de acesso à infraestrutura e atualização de dependências. Nenhum sistema é totalmente imune a incidentes; comunicaremos fatos relevantes conforme exigências legais aplicáveis.',
      ],
    },
    {
      id: 'menores-alteracoes',
      title: '9. Crianças, alterações e vigência',
      paragraphs: [
        'O site destina-se ao público em geral interessado em finanças e não é direcionado especificamente a menores. Não coletamos intencionalmente dados de crianças.',
        'Esta política pode ser atualizada a qualquer momento. A data da última revisão consta no cabeçalho editorial. O uso continuado após publicação implica ciência da versão vigente.',
        'Em caso de conflito entre esta política e disposição legal imperativa, prevalece a norma aplicável.',
      ],
    },
  ],
  faq: [
    {
      question: 'Vocês armazenam o que eu digito nas calculadoras?',
      answer: 'Não. Os cálculos são executados no seu navegador. Valores de simulação não são enviados aos nossos servidores.',
    },
    {
      question: 'O site possui suporte ou formulário de contato?',
      answer: `Não. O ${SITE_DOMAIN} opera sem canal de atendimento. Questões sobre privacidade relacionadas a cookies de terceiros devem ser gerenciadas via navegador, Google ou ANPD, conforme esta política.`,
    },
    {
      question: 'Como desativo cookies de publicidade?',
      answer: 'Use as configurações do navegador, o banner de cookies (quando disponível) ou google.com/settings/ads.',
    },
    {
      question: 'Quem é responsável pelos dados do Google AdSense?',
      answer: 'O Google e seus parceiros atuam como controladores ou operadores independentes conforme seus termos. Consulte policies.google.com/privacy.',
    },
    {
      question: 'Posso apagar o cache de cotações de moedas?',
      answer: 'Sim. Limpe dados do site ou localStorage do domínio nas configurações de privacidade do navegador.',
    },
    {
      question: 'Como reclamar à ANPD?',
      answer: 'Acesse gov.br/anpd para orientações sobre reclamações e procedimentos perante a autoridade nacional.',
    },
  ],
  glossary: [
    { term: 'Controlador', definition: 'Pessoa ou entidade que toma decisões sobre o tratamento de dados pessoais.' },
    { term: 'Operador', definition: 'Quem trata dados em nome do controlador, conforme instruções deste.' },
    { term: 'Dado anonimizado', definition: 'Informação que não permite identificação do titular, consideradas as meios técnicas disponíveis.' },
  ],
  sources: [SOURCES.ANPD, SOURCES.GOV, SOURCES.BCB],
  relatedTools: [{ label: 'Juros Compostos', href: ROUTES.home, description: 'Cálculo 100% local no navegador.' }],
  relatedCategories: [{ label: 'Finanças Pessoais', href: ROUTES.categoria('financas-pessoais') }],
};

export const LEGAL_TERMOS: InstitutionalContent = {
  slug: 'termos',
  title: 'Termos de Uso',
  h1: 'Termos de Uso',
  metaTitle: `Termos de Uso | ${SITE_DOMAIN}`,
  metaDescription: `Condições de acesso ao ${SITE_DOMAIN}: uso permitido, propriedade intelectual, limitações, dados de terceiros, ausência de assessoria e responsabilidades.`,
  intro: `Estes Termos de Uso regulam o acesso e a utilização do site ${SITE_DOMAIN}, incluindo calculadoras, blog e páginas institucionais. Ao acessar ou usar o site, você concorda integralmente com estes termos, com a Política de Privacidade, a Política de Cookies e a Isenção de Responsabilidade. Se não concordar, interrompa o uso imediatamente.`,
  updatedAt: UPDATED,
  author: SITE_AUTHOR,
  sections: [
    {
      id: 'aceitacao',
      title: '1. Aceitação, capacidade e ausência de suporte',
      paragraphs: [
        `O uso do ${SITE_DOMAIN} constitui aceitação eletrônica destes Termos e dos documentos legais complementares que integram o acordo entre você e o operador do site.`,
        'Você declara ter capacidade civil para utilizar o site ou fazê-lo sob supervisão de responsável legal. O conteúdo é informativo e educativo.',
        `O site não oferece suporte ao usuário, atendimento por e-mail, chat ou qualquer canal de comunicação direta. Não há expectativa de resposta a solicitações externas ao funcionamento autônomo das ferramentas publicadas.`,
      ],
    },
    {
      id: 'objeto',
      title: '2. Objeto do serviço',
      paragraphs: [
        `O ${SITE_DOMAIN} disponibiliza ferramentas de simulação matemática, artigos educativos e material de referência sobre finanças pessoais, investimentos, aposentadoria e temas trabalhistas no Brasil.`,
        'O serviço é fornecido "no estado em que se encontra" (as is), sem garantia de disponibilidade ininterrupta, ausência total de erros ou adequação a finalidade específica além do caráter educativo declarado.',
        'Podemos alterar, suspender ou descontinuar funcionalidades a qualquer momento, sem aviso prévio, na medida permitida pela lei.',
      ],
    },
    {
      id: 'uso-permitido',
      title: '3. Uso permitido e condutas proibidas',
      paragraphs: ['É permitido o uso pessoal, educativo e não comercial do site, respeitando estes termos e a legislação brasileira.'],
      list: [
        'Utilizar calculadoras para planejamento pessoal e estudo',
        'Citar trechos do conteúdo com atribuição e link para a fonte original',
        'Compartilhar links de páginas em redes sociais',
      ],
      subsections: [
        {
          id: 'proibicoes',
          title: 'Condutas vedadas',
          paragraphs: [
            `É vedado, sem autorização prévia por escrito: reproduzir comercialmente grandes volumes do site; realizar scraping automatizado agressivo que degrade a infraestrutura; tentar acessar áreas restritas, código-fonte ou servidores; distribuir malware; usar o site para spam, phishing ou práticas enganosas; remover avisos de direitos autorais; se passar pelo ${SITE_DOMAIN} em outros canais; ou utilizar o site de forma que viole direitos de terceiros.`,
          ],
        },
      ],
    },
    {
      id: 'nao-assessoria',
      title: '4. Ausência de assessoria e relação com o usuário',
      paragraphs: [
        `Nada neste site constitui oferta de valores mobiliários, recomendação de investimento personalizada, consultoria jurídica, contábil, tributária ou previdenciária. Não somos instituição financeira autorizada pela CVM, corretora, banco, seguradora ou escritório de advocacia.`,
        'Resultados de calculadoras são estimativas baseadas em parâmetros informados pelo usuário e premissas documentadas. Decisões financeiras, trabalhistas ou fiscais devem ser validadas com profissionais habilitados e fontes oficiais.',
        'A utilização gratuita das ferramentas não cria relação de consumo de serviço personalizado, contrato de assessoria ou vínculo de prestação de serviços contínuos.',
      ],
    },
    {
      id: 'propriedade',
      title: '5. Propriedade intelectual e conteúdo de terceiros',
      paragraphs: [
        `Textos originais, design, identidade visual, código-fonte proprietário e compilação editorial do ${SITE_DOMAIN} são protegidos por direitos autorais e pertencem ao operador do site ou a licenciadores, salvo indicação em contrário.`,
        'Não nos pertencem, entre outros: fórmulas matemáticas de domínio público; séries estatísticas e normas de órgãos governamentais; cotações e APIs de terceiros; marcas, logotipos e nomes comerciais de instituições citadas de forma identificativa; conteúdo de sites externos linkados.',
      ],
      subsections: [
        {
          id: 'licenca-usuario',
          title: 'Licença limitada ao usuário',
          paragraphs: [
            'Concedemos licença revogável, não exclusiva e intransferível para acessar e usar o site conforme estes termos. Não implica cessão de direitos de propriedade intelectual.',
          ],
        },
        {
          id: 'dados-usuario',
          title: 'Dados inseridos pelo usuário',
          paragraphs: [
            'Os valores e parâmetros digitados nas calculadoras permanecem sob controle do usuário no dispositivo local. O operador do site não reivindica propriedade sobre esses dados nem os armazena em servidores próprios para simulação.',
          ],
        },
      ],
    },
    {
      id: 'links-terceiros',
      title: '6. Links, APIs e serviços de terceiros',
      paragraphs: [
        'O site pode conter links para páginas externas (órgãos governamentais, Google, provedores de API, anunciantes). Não controlamos nem endossamos conteúdo, disponibilidade, precisão ou práticas de privacidade de terceiros.',
        'A integração com APIs públicas de taxas e câmbio depende de serviços externos. Interrupções, alterações de formato ou descontinuação dessas APIs podem afetar funcionalidades sem responsabilidade do operador por indisponibilidade alheia.',
      ],
    },
    {
      id: 'publicidade',
      title: '7. Publicidade',
      paragraphs: [
        'Anúncios exibidos via Google AdSense ou programas similares são de responsabilidade dos anunciantes e da rede de publicidade. A presença de anúncio não implica endosso editorial do produto ou serviço anunciado.',
        'A receita publicitária pode sustentar a operação do site, sem influenciar fórmulas das calculadoras ou independência do conteúdo educativo.',
      ],
    },
    {
      id: 'limitacao',
      title: '8. Limitação de responsabilidade',
      paragraphs: [
        `Na máxima extensão permitida pela lei aplicável, o ${SITE_DOMAIN}, seus editores e colaboradores não serão responsáveis por danos diretos, indiretos, incidentais, lucros cessantes, perda de dados locais ou prejuízos decorrentes do uso ou impossibilidade de uso do site, de decisões tomadas com base em simulações, de imprecisões em dados de terceiros ou de indisponibilidade de APIs externas.`,
        'Algumas jurisdições não permitem exclusões amplas; nesses casos, a limitação aplica-se na medida máxima legal, sem prejuízo de direitos irrenunciáveis do consumidor quando aplicáveis.',
      ],
    },
    {
      id: 'indenizacao',
      title: '9. Indenização',
      paragraphs: [
        `Você concorda em indenizar e isentar o operador do ${SITE_DOMAIN} de reclamações, perdas e despesas (incluindo honorários advocatícios razoáveis) decorrentes de violação destes termos ou uso indevido do site por você, na medida permitida pela lei.`,
      ],
    },
    {
      id: 'gerais',
      title: '10. Disposições gerais',
      paragraphs: [
        'Podemos alterar estes Termos a qualquer momento, publicando a versão atualizada com nova data de revisão. O uso continuado após alterações constitui aceitação.',
        'A invalidade de uma cláusula não afeta as demais. A tolerância quanto a descumprimento não implica renúncia.',
        'Estes termos são regidos pelas leis da República Federativa do Brasil. Foro competente: comarca do domicílio do operador do site, salvo disposição legal imperativa em favor do consumidor.',
      ],
    },
  ],
  faq: [
    {
      question: 'Posso copiar textos do blog para meu site?',
      answer: 'Citações curtas com atribuição e link são aceitáveis. Reprodução integral ou republicação comercial exige autorização prévia.',
    },
    {
      question: 'O uso das calculadoras cria contrato de assessoria?',
      answer: 'Não. O uso é gratuito e educativo, sem prestação de serviços profissionais individualizados ou suporte.',
    },
    {
      question: 'Vocês podem restringir meu acesso?',
      answer: 'Podemos limitar acesso em caso de abuso, ataques automatizados ou violação destes termos.',
    },
    {
      question: 'Quem responde por dados do Banco Central ou Google?',
      answer: 'Os respectivos provedores, conforme suas políticas. O site apenas consome ou referencia essas fontes.',
    },
    {
      question: 'Onde está a isenção detalhada?',
      answer: 'Na página de Isenção de Responsabilidade, complementar a estes Termos.',
    },
  ],
  glossary: [],
  sources: [SOURCES.GOV, SOURCES.CVM, SOURCES.ANPD],
  relatedTools: [
    { label: 'Juros Compostos', href: ROUTES.home, description: 'Sujeita às limitações destes termos.' },
    { label: 'CLT vs PJ', href: ROUTES.cltPj, description: 'Simulação educativa, não parecer fiscal.' },
  ],
};

export const LEGAL_COOKIES: InstitutionalContent = {
  slug: 'cookies',
  title: 'Política de Cookies',
  h1: 'Política de Cookies',
  metaTitle: `Política de Cookies | ${SITE_DOMAIN}`,
  metaDescription: `Cookies e tecnologias similares no ${SITE_DOMAIN}: tipos, finalidades, Google AdSense, localStorage, gestão de preferências e bases legais conforme LGPD.`,
  intro: `Esta Política de Cookies explica o que são cookies e tecnologias similares, quais podem ser utilizados no ${SITE_DOMAIN}, para quais finalidades e como você pode gerenciá-los. Complementa a Política de Privacidade e deve ser lida em conjunto com os Termos de Uso. O site não utiliza cookies para armazenar valores financeiros digitados nas calculadoras.`,
  updatedAt: UPDATED,
  author: SITE_AUTHOR,
  sections: [
    {
      id: 'o-que-sao',
      title: '1. O que são cookies e tecnologias similares',
      paragraphs: [
        'Cookies são pequenos arquivos de texto armazenados no dispositivo quando você visita um site. Permitem reconhecer o navegador, lembrar preferências, medir audiência ou exibir publicidade.',
        'Tecnologias similares incluem localStorage, sessionStorage, pixels de rastreamento e identificadores de publicidade definidos por terceiros. No nosso caso, o localStorage pode ser usado apenas para cache de cotações de moedas (dados de mercado, não valores de simulação).',
      ],
    },
    {
      id: 'tipos',
      title: '2. Tipos de cookies e armazenamento que utilizamos',
      paragraphs: ['Classificamos por finalidade e origem. A lista pode evoluir conforme ferramentas forem habilitadas ou atualizadas.'],
      subsections: [
        {
          id: 'essenciais',
          title: 'Estritamente necessários',
          paragraphs: [
            'Indispensáveis ao funcionamento básico: segurança, balanceamento, preferência de consentimento (quando exibimos banner) e recursos técnicos. Em regra, não exigem consentimento prévio por serem necessários ao serviço solicitado.',
          ],
        },
        {
          id: 'publicidade',
          title: 'Publicidade (Google AdSense)',
          paragraphs: [
            'Utilizados para exibir anúncios, limitar frequência, medir campanhas e personalizar anúncios com base em interesses inferidos de navegação neste e em outros sites da rede Google.',
            'O Google e parceiros certificados podem definir cookies como _gads, IDE (DoubleClick) e similares. Política: https://policies.google.com/technologies/ads',
          ],
        },
        {
          id: 'analytics',
          title: 'Analytics e desempenho',
          paragraphs: [
            'Podem medir páginas visitadas, origem do tráfego e erros de forma agregada ou pseudonimizada. Quando exigido, só são ativados após consentimento no banner.',
          ],
        },
        {
          id: 'localstorage-cambio',
          title: 'localStorage (cotações)',
          paragraphs: [
            `O conversor de moedas pode armazenar localmente, por tempo limitado, taxas obtidas de APIs públicas. Não contém dados pessoais identificáveis nem valores das suas simulações. Pode ser removido nas configurações do navegador.`,
          ],
        },
      ],
    },
    {
      id: 'terceiros',
      title: '3. Cookies de terceiros e o que não controlamos',
      paragraphs: [
        'Terceiros — principalmente Google (AdSense, Analytics quando habilitado) — definem cookies ao carregar scripts em nossas páginas. Não controlamos integralmente esses cookies nem o tratamento de dados realizado por esses agentes.',
        'CDNs e APIs utilizadas para fontes, scripts ou cotações podem registrar acessos técnicos conforme suas próprias políticas. Recomendamos consultar a documentação dos respectivos fornecedores.',
      ],
    },
    {
      id: 'bases-legais',
      title: '4. Bases legais e consentimento (LGPD)',
      paragraphs: [
        'Cookies essenciais baseiam-se em legítimo interesse ou execução do serviço. Cookies de publicidade e analytics não essenciais, quando aplicável, baseiam-se em consentimento obtido via banner ou configuração equivalente.',
        'Você pode retirar ou alterar o consentimento a qualquer momento. As calculadoras continuam funcionando localmente na maioria dos cenários, embora anúncios e medição possam ser afetados.',
      ],
    },
    {
      id: 'gerenciar',
      title: '5. Como gerenciar cookies e armazenamento local',
      paragraphs: ['Você dispõe de opções para controlar cookies e localStorage:'],
      list: [
        'Banner ou painel de preferências no site (quando disponível)',
        'Configurações do navegador — bloquear, excluir ou alertar sobre cookies',
        'Painel de anúncios Google — https://www.google.com/settings/ads',
        'Limpeza de dados do site / localStorage do domínio calculojuroscompostos.com.br',
        'Modo de navegação privada (com limitações)',
      ],
      subsections: [
        {
          id: 'consequencias',
          title: 'Consequências do bloqueio',
          paragraphs: [
            'Bloquear todos os cookies pode impedir lembrar preferências de consentimento ou causar exibição repetitiva de banners. As calculadoras permanecem operacionais na maioria dos casos.',
          ],
        },
      ],
    },
    {
      id: 'prazos',
      title: '6. Prazos de retenção',
      paragraphs: [
        'Cookies de sessão expiram ao fechar o navegador. Cookies persistentes permanecem até a data de expiração definida pelo emissor (frequentemente 30 dias a 24 meses para publicidade). O cache de cotações em localStorage expira em aproximadamente 30 minutos ou ao limpar dados do site.',
      ],
    },
    {
      id: 'atualizacoes',
      title: '7. Atualizações e ausência de suporte',
      paragraphs: [
        'Esta política pode ser revisada para refletir mudanças tecnológicas ou regulatórias. A data da última atualização consta no cabeçalho editorial.',
        `O ${SITE_DOMAIN} não mantém canal de contato para dúvidas sobre cookies. Utilize as ferramentas de gestão do navegador, do Google ou consulte a ANPD em caso de tratamento que considere irregular, conforme a Política de Privacidade.`,
      ],
    },
  ],
  faq: [
    {
      question: 'Preciso aceitar cookies para usar as calculadoras?',
      answer: 'Não para o cálculo em si, que é local. Cookies de publicidade ou analytics podem ser gerenciados conforme suas preferências.',
    },
    {
      question: 'O AdSense usa meus dados financeiros das calculadoras?',
      answer: 'Não. Valores digitados nas simulações não são enviados aos nossos servidores. Cookies de publicidade refletem navegação web, não entradas das calculadoras.',
    },
    {
      question: 'Como excluo cookies deste site?',
      answer: `Nas configurações de privacidade do navegador, busque cookies do domínio ${SITE_DOMAIN} e exclua. Isso pode resetar preferências salvas.`,
    },
    {
      question: 'O que é o localStorage de cotações?',
      answer: 'Armazenamento temporário de taxas de câmbio de APIs públicas, para evitar consultas repetidas. Não guarda dados pessoais.',
    },
    {
      question: 'Vocês usam cookies de redes sociais?',
      answer: 'Atualmente não incorporamos widgets sociais que definam cookies. Se isso mudar, atualizaremos esta política.',
    },
  ],
  glossary: [
    { term: 'Cookie de sessão', definition: 'Expira ao encerrar o navegador.' },
    { term: 'Cookie persistente', definition: 'Permanece até expiração ou exclusão manual.' },
    { term: 'localStorage', definition: 'Armazenamento local do navegador, distinto de cookies, usado aqui apenas para cache de cotações.' },
  ],
  sources: [SOURCES.ANPD, SOURCES.GOV],
  relatedTools: [{ label: 'Calculadora CDI', href: ROUTES.calculadoraCdi, description: 'Funciona sem envio de dados de simulação.' }],
};
