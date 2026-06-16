import type { HubContentBase } from '../types';
import { ROUTES } from '../../constants/routes';
import {
  SOURCES_BCB,
  SOURCES_INSS,
  SOURCES_PREVIDENCIA,
} from '../../constants/eeat';

export const aposentadoriaHub: HubContentBase = {
  slug: 'aposentadoria',
  h1: 'Guia Completo de Aposentadoria e Previdência no Brasil',
  metaTitle: 'Aposentadoria no Brasil: INSS, Previdência Privada e Planejamento 2026',
  metaDescription:
    'Entenda regras do INSS, previdência privada (PGBL/VGBL), juros compostos no longo prazo, impacto da inflação e caminho para independência financeira. Conteúdo baseado em fontes oficiais.',
  intro:
    'Aposentadoria no Brasil combina benefício público do INSS, eventual complemento por previdência privada e, cada vez mais, patrimônio acumulado pelo próprio trabalhador. Com reformas que elevaram idade mínima e exigências de contribuição, planejar cedo deixou de ser opcional. Este guia explica como funciona o sistema previdenciário, o papel dos juros compostos na acumulação de longo prazo, o efeito da inflação sobre a renda futura e o que significa buscar independência financeira — com referência ao INSS, Ministério da Previdência Social e Banco Central.',
  updatedAt: '2026-06-15',
  author: 'Equipe calculojuroscompostos.com',
  sections: [
    {
      id: 'planejamento-aposentadoria',
      title: 'Planejamento de aposentadoria: por que começar cedo',
      paragraphs: [
        'Planejar aposentadoria é estimar quanto você precisará viver com dignidade quando a renda do trabalho cessar — e construir, ao longo de décadas, os recursos para cobrir essa necessidade. Quanto mais cedo começar, menor o esforço mensal: juros compostos transformam aportes modestos em patrimônio relevante quando o horizonte passa de 25 ou 30 anos.',
        'O planejamento envolve três pilares: (1) entender o que o INSS pagará; (2) avaliar se previdência privada faz sentido no seu caso tributário; (3) investir de forma consistente para fechar a lacuna entre a renda desejada e a renda previdenciária. Ignorar qualquer um desses pilares gera surpresas desagradáveis aos 50 ou 55 anos.',
        'Defina sua renda alvo na aposentadoria em valores de hoje e projete com inflação. Muitos especialistas sugerem manter entre 70% e 80% da renda líquida atual, ajustando conforme despesas que cessam (financiamento quitado, filhos independentes) e novas (saúde, cuidados).',
      ],
      subsections: [
        {
          id: 'lacuna-renda',
          title: 'Lacuna de renda',
          paragraphs: [
            'Lacuna de renda é a diferença entre o que você precisa por mês na aposentadoria e o que o INSS (mais outras fontes garantidas) pagará. Essa lacuna deve ser coberta por patrimônio acumulado. A regra dos 4% — sacar cerca de 4% do patrimônio ao ano — é referência internacional para estimar se o montante sustenta décadas de retirada, sempre adaptando ao contexto brasileiro de inflação e tributação.',
          ],
        },
      ],
    },
    {
      id: 'inss-previdencia-social',
      title: 'INSS e Previdência Social',
      paragraphs: [
        'O Instituto Nacional do Seguro Social (INSS) administra o Regime Geral de Previdência Social (RGPS), financiado principalmente por contribuições de empregados, empregadores e contribuintes individuais. O benefício de aposentadoria por idade, tempo de contribuição ou regras de transição depende de quando o segurado começou a contribuir e de qual regra se aplica ao seu caso.',
        'O teto previdenciário limita o valor máximo do benefício — atualizado periodicamente. Quem ganha acima do teto contribui sobre o limite, mas não recebe proporcionalmente mais. Isso reforça a necessidade de complemento privado para quem tem renda elevada durante a vida ativa.',
        'Tempo de contribuição, carência, idade mínima e pontuação (soma de idade e tempo) variam conforme a regra escolhida ou aplicável. O Ministério da Previdência Social publica orientações e o INSS disponibiliza extrato do CNIS (Cadastro Nacional de Informações Sociais) para conferir vínculos e contribuições.',
      ],
      subsections: [
        {
          id: 'regras-transicao',
          title: 'Regras de transição e reforma',
          paragraphs: [
            'A Reforma da Previdência de 2019 estabeleceu regras permanentes mais restritivas e regras de transição para quem já contribuía. Pedágio de 50%, pedágio de 100%, idade progressiva e pontos são mecanismos que afetam quando cada pessoa pode se aposentar. Consulte o extrato previdenciário e simule no Meu INSS antes de decidir pedir o benefício.',
          ],
        },
        {
          id: 'aposentadoria-especial',
          title: 'Aposentadoria especial e rural',
          paragraphs: [
            'Trabalhadores expostos a agentes nocivos podem ter direito à aposentadoria especial, com requisitos de tempo e documentação específica. O segurado rural tem regras próprias de comprovação de atividade. Ambos os casos exigem análise individualizada da documentação.',
          ],
        },
      ],
      list: [
        'Mantenha o CNIS atualizado e corrija vínculos ou salários incorretos com antecedência.',
        'Contribuições em atraso podem ser regularizadas — avalie impacto no tempo de contribuição.',
        'O benefício do INSS não substitui planejamento: o teto limita a renda previdenciária.',
      ],
    },
    {
      id: 'previdencia-privada',
      title: 'Previdência privada: PGBL, VGBL e planos',
      paragraphs: [
        'Previdência privada complementa o INSS por meio de planos patrocinados por empregadores ou planos individuais em seguradoras e corretoras. Os dois regimes tributários principais para pessoa física são PGBL (Plano Gerador de Benefício Livre) e VGBL (Vida Gerador de Benefício Livre).',
        'No PGBL, as contribuições podem ser deduzidas do Imposto de Renda até o limite de 12% da renda bruta anual tributável. Na resgate ou no recebimento da renda, incide IR sobre o valor total (aportes + rendimentos). Indicado para quem faz declaração completa e tem margem de dedução.',
        'No VGBL, não há dedução na entrada; o IR incide apenas sobre os rendimentos na saída. Costuma ser mais adequado para quem declara no simplificado, é isento de IR ou já esgotou a dedução de 12%. A escolha errada entre PGBL e VGBL pode custar milhares de reais em impostos ao longo de décadas.',
      ],
      subsections: [
        {
          id: 'taxas-previdencia',
          title: 'Taxas e rentabilidade',
          paragraphs: [
            'Planos de previdência cobram taxa de administração e, em alguns casos, taxa de carregamento na entrada ou saída. Compare rentabilidade líquida de taxas, perfil de investimento do fundo (conservador, moderado, arrojado) e regulamento. Fundos de previdência têm tributação regressiva de IR conforme o tempo de permanência — alíquotas menores após dez anos.',
          ],
        },
        {
          id: 'portabilidade',
          title: 'Portabilidade entre planos',
          paragraphs: [
            'A portabilidade permite transferir recursos entre planos de previdência sem incidência imediata de IR, preservando o tempo de tributação regressiva quando aplicável. É ferramenta útil para migrar de planos com taxas altas para opções mais eficientes, respeitando prazos e regulamentos da Susep e da CVM.',
          ],
        },
      ],
    },
    {
      id: 'juros-compostos-longo-prazo',
      title: 'Juros compostos no longo prazo',
      paragraphs: [
        'Na aposentadoria, o horizonte de 20 a 40 anos coloca os juros compostos como protagonista. Um aporte de R$ 500 por mês a uma taxa real de 4% ao ano acumula mais de R$ 220 mil em 20 anos — dos quais a maior parte são rendimentos, não aportes. Nos últimos anos, o crescimento acelera de forma visível.',
        'A fórmula M = P × (1 + i)^n, combinada com aportes periódicos, mostra por que interrupções precoces prejudicam tanto: perder dez anos no início de uma carreira pode equivaler a dobrar o aporte necessário para atingir o mesmo montante.',
        'Consistência supera timing de mercado para o investidor pessoal. Aportes automáticos mensais, rebalanceamento anual e revisão de metas a cada mudança de renda são práticas mais eficazes do que tentar adivinhar o melhor momento de entrar na bolsa.',
      ],
      list: [
        'Simule cenários com taxas conservadoras, moderadas e otimistas.',
        'Aumente aportes quando a renda crescer — evite expandir o padrão de vida na mesma proporção.',
        'Reinvista rendimentos sempre que possível para maximizar a capitalização.',
      ],
    },
    {
      id: 'acumulacao-patrimonio',
      title: 'Acumulação de patrimônio para a aposentadoria',
      paragraphs: [
        'Acumular patrimônio para aposentadoria não exige apenas previdência privada. Tesouro IPCA+, fundos de investimento, ações de empresas sólidas, FIIs e outros ativos regulados podem compor a carteira de longo prazo, conforme perfil e conhecimento. A diversificação reduz dependência de uma única fonte de renda futura.',
        'FGTS, embora não seja livremente movimentável durante o emprego CLT, entra no cálculo patrimonial e pode ser usado na aposentadoria ou na compra da casa própria. PGBL corporativo com contrapartida do empregador é benefício valioso — recuse apenas com critério.',
        'Defina uma meta de patrimônio (valor alvo) e calcule o aporte mensal necessário. Nossa calculadora de aposentadoria integra lacuna de renda, expectativa de vida e taxa de retorno para estimar o montante e os aportes.',
      ],
      subsections: [
        {
          id: 'fases-acumulacao',
          title: 'Fases da acumulação',
          paragraphs: [
            'Na fase inicial (20–35 anos), priorize aportes consistentes e aprendizado. Na fase de aceleração (35–50), a renda costuma ser maior — é hora de aumentar aportes. Na fase de conservação (50+), muitos investidores reduzem volatilidade para proteger o que foi acumulado, sem abandonar completamente ativos de crescimento se o prazo ainda for longo.',
          ],
        },
      ],
    },
    {
      id: 'inflacao-poder-compra',
      title: 'Inflação e poder de compra na aposentadoria',
      paragraphs: [
        'Inflação corrói o poder de compra: R$ 5.000 de hoje não compram o mesmo daqui a 20 anos. O IPCA, medido pelo IBGE e monitorado pelo Banco Central, é a referência oficial. Benefícios do INSS são reajustados anualmente, mas o complemento privado depende da rentabilidade dos investimentos superar a inflação.',
        'Investimentos indexados ao IPCA (Tesouro IPCA+, fundos referenciados) protegem o nominal contra a inflação, mas não garantem ganho real adicional. Para crescer acima da inflação, é necessário exposição a ativos de risco controlado — ações, multimercado, imóveis — com horizonte compatível.',
        'Ao planejar, projete despesas futuras em valores reais (descontada a inflação) e teste cenários com inflação de 4%, 6% e 8% ao ano. Saúde e moradia costumam subir acima da média do IPCA para aposentados.',
      ],
    },
    {
      id: 'independencia-financeira',
      title: 'Independência financeira e aposentadoria antecipada',
      paragraphs: [
        'Independência financeira (IF) ocorre quando o patrimônio gera renda suficiente para cobrir despesas sem necessidade de trabalho assalariado. É conceito distinto da aposentadoria pelo INSS: você pode ser financeiramente independente aos 45 anos e ainda não ter direito ao benefício previdenciário.',
        'O número da IF varia conforme gastos anuais. Multiplicar despesas anuais por 25 (inverso de 4%) é atalho comum para estimar patrimônio necessário — ajustável conforme taxa de retorno esperada, inflação e duração da aposentadoria. No Brasil, tributação e custos de saúde privada exigem margem de segurança adicional.',
        'IF antecipada exige taxa de poupança elevada e disciplina. Movimentos como FIRE (Financial Independence, Retire Early) inspiram, mas adaptar expectativas à realidade brasileira — juros, impostos, informalidade — evita frustração. Mesmo quem não busca aposentadoria aos 40 beneficia-se dos princípios: gastar menos do que ganha, investir o excedente e evitar dívidas caras.',
      ],
      list: [
        'Calcule seus gastos anuais reais antes de definir meta de patrimônio.',
        'Separe reserva de emergência da carteira de aposentadoria.',
        'Revise o plano a cada mudança relevante de renda, família ou legislação.',
      ],
    },
  ],
  faq: [
    {
      question: 'O INSS sozinho garante aposentadoria confortável?',
      answer:
        'Para a maioria das pessoas com renda média ou alta, não. O teto previdenciário limita o benefício, e muitos trabalhadores se aposentam próximos ao salário mínimo. Complemento por investimentos ou previdência privada é essencial para manter padrão de vida.',
    },
    {
      question: 'PGBL ou VGBL: qual escolher?',
      answer:
        'PGBL tende a beneficiar quem declara IR completo e pode deduzir até 12% da renda bruta. VGBL costuma ser melhor para quem usa simplificado, é isento ou já atingiu o limite de dedução. A decisão depende do regime tributário atual e futuro.',
    },
    {
      question: 'Com que idade devo começar a planejar?',
      answer:
        'O ideal é no primeiro emprego formal ou assim que houver renda estável. Quanto antes, menor o aporte mensal necessário graças aos juros compostos. Começar aos 40 ainda é viável, mas exige aportes maiores.',
    },
    {
      question: 'Como a inflação afeta meu plano de aposentadoria?',
      answer:
        'Inflação reduz o poder de compra do dinheiro acumulado. Planeje em valores reais e priorize investimentos que historicamente superam o IPCA no longo prazo, sempre dentro do seu perfil de risco.',
    },
    {
      question: 'Posso contar apenas com FGTS na aposentadoria?',
      answer:
        'FGTS é complementar e tem saque limitado às regras do fundo (demissão sem justa causa, compra da casa, aposentadoria etc.). Não substitui investimentos regulares nem o benefício do INSS.',
    },
    {
      question: 'O que é lacuna de renda?',
      answer:
        'É a diferença entre a renda mensal que você precisará na aposentadoria e o que fontes garantidas (INSS, pensões) pagarão. Essa diferença deve ser coberta por retiradas do patrimônio acumulado.',
    },
    {
      question: 'Independência financeira é o mesmo que aposentadoria pelo INSS?',
      answer:
        'Não. Independência financeira é quando seu patrimônio sustenta seu custo de vida sem trabalho. Aposentadoria pelo INSS é um benefício previdenciário com requisitos legais de idade e contribuição — podem ocorrer em momentos diferentes.',
    },
  ],
  glossary: [
    { term: 'INSS', definition: 'Instituto Nacional do Seguro Social — autarquia que administra benefícios do Regime Geral de Previdência Social.' },
    { term: 'RGPS', definition: 'Regime Geral de Previdência Social — sistema público de previdência financiado por contribuições.' },
    { term: 'CNIS', definition: 'Cadastro Nacional de Informações Sociais — histórico de vínculos e contribuições previdenciárias.' },
    { term: 'Teto previdenciário', definition: 'Valor máximo mensal do benefício do INSS, atualizado periodicamente pela legislação.' },
    { term: 'PGBL', definition: 'Plano Gerador de Benefício Livre — previdência privada com dedução na contribuição e IR sobre total na saída.' },
    { term: 'VGBL', definition: 'Vida Gerador de Benefício Livre — previdência privada sem dedução na entrada; IR apenas sobre rendimentos na saída.' },
    { term: 'Lacuna de renda', definition: 'Diferença entre renda necessária na aposentadoria e benefícios previdenciários garantidos.' },
    { term: 'Rentabilidade real', definition: 'Retorno dos investimentos descontada a inflação — ganho efetivo de poder de compra.' },
    { term: 'Independência financeira', definition: 'Estado em que o patrimônio gera renda suficiente para despesas sem trabalho assalariado.' },
  ],
  sources: [SOURCES_INSS, SOURCES_PREVIDENCIA, SOURCES_BCB],
  relatedTools: [
    { label: 'Calculadora de Aposentadoria', href: ROUTES.aposentadoria, description: 'Estime patrimônio necessário, lacuna de renda e aportes mensais.' },
    { label: 'Juros Compostos', href: ROUTES.jurosCompostos, description: 'Simule crescimento do patrimônio com aportes ao longo de décadas.' },
    { label: 'Calculadora IPCA', href: ROUTES.calculadoraIpca, description: 'Projete o impacto da inflação na sua meta de aposentadoria.' },
  ],
  relatedCategories: [
    { label: 'Investimentos', href: ROUTES.categoria('investimentos') },
    { label: 'Finanças Pessoais', href: ROUTES.categoria('financas-pessoais') },
  ],
  relatedArticles: [
    { label: 'Quanto investir para se aposentar', href: ROUTES.blogPost('quanto-investir-para-se-aposentar') },
    { label: 'Como calcular juros compostos', href: ROUTES.blogPost('como-calcular-juros-compostos') },
  ],
};
