import type { HubContentBase } from '../types';
import { ROUTES } from '../../constants/routes';
import { SOURCES_BCB, SOURCES_CVM } from '../../constants/eeat';

export const financasPessoaisHub: HubContentBase = {
  slug: 'financas-pessoais',
  h1: 'Guia Completo de Finanças Pessoais no Brasil',
  metaTitle: 'Finanças Pessoais: Orçamento, Reserva e Metas 2026 | Guia Prático',
  metaDescription:
    'Organize suas finanças com orçamento, reserva de emergência, controle de gastos e metas. Aprenda a sair do endividamento, planejar em família e consumir com consciência. Conteúdo baseado em fontes oficiais.',
  intro:
    'Finanças pessoais não são apenas sobre cortar gastos — são sobre tomar decisões conscientes com o dinheiro que entra e sai da sua vida. No Brasil, onde juros de crédito costumam ser elevados e a inflação corrói o poder de compra, organizar o orçamento, construir reserva de emergência e definir metas claras faz diferença real no bem-estar financeiro. Este guia aborda desde o diagnóstico da situação atual até o planejamento familiar e o consumo consciente, com referência a orientações do Banco Central e da CVM sobre educação financeira.',
  updatedAt: '2026-06-15',
  author: 'Equipe calculojuroscompostos.com',
  sections: [
    {
      id: 'organizacao-financeira',
      title: 'Organização financeira: o ponto de partida',
      paragraphs: [
        'Organizar as finanças pessoais começa por enxergar a realidade com clareza: quanto você ganha, quanto gasta, quanto deve e quanto já acumulou. Sem esse diagnóstico, qualquer meta vira chute. O Banco Central do Brasil incentiva a educação financeira justamente porque decisões informadas reduzem superendividamento e melhoram a qualidade de vida.',
        'O primeiro passo prático é centralizar informações: extratos bancários, faturas de cartão, boletos, contratos de financiamento e comprovantes de renda. Muitas pessoas subestimam gastos recorrentes pequenos — assinaturas, delivery, taxas bancárias — que, somados, representam centenas de reais por mês.',
        'Organização não exige planilhas complexas. Um método simples e consistente supera um sistema sofisticado que você abandona em duas semanas. O importante é revisar os números com periodicidade definida — semanal para gastos variáveis, mensal para o panorama geral.',
      ],
      subsections: [
        {
          id: 'diagnostico-patrimonial',
          title: 'Diagnóstico patrimonial',
          paragraphs: [
            'Liste ativos (poupança, investimentos, imóveis, veículos quitados) e passivos (dívidas, financiamentos, saldo devedor do cartão). A diferença é seu patrimônio líquido. Mesmo negativo, o número é útil: ele mostra de onde você parte e permite medir progresso ao longo dos meses.',
          ],
        },
        {
          id: 'fluxo-de-caixa',
          title: 'Fluxo de caixa pessoal',
          paragraphs: [
            'Fluxo de caixa é a movimentação de entradas e saídas em um período. Entradas incluem salário, freelas, aluguéis e rendimentos. Saídas dividem-se em fixas (aluguel, escola, plano de saúde) e variáveis (mercado, lazer, vestuário). Quando saídas superam entradas de forma estrutural, o déficit se transforma em dívida — e no Brasil, dívida cara.',
          ],
        },
      ],
    },
    {
      id: 'orcamento',
      title: 'Orçamento pessoal e familiar',
      paragraphs: [
        'Orçamento é um plano de alocação da renda: quanto vai para necessidades, quanto para desejos, quanto para poupança e pagamento de dívidas. Não é restrição arbitrária — é priorização explícita. Sem orçamento, o dinheiro tende a ir para o que grita mais alto no momento, não para o que importa no longo prazo.',
        'A regra 50-30-20 é um ponto de partida popular: 50% para necessidades, 30% para desejos e 20% para metas financeiras (reserva, investimentos, amortização de dívidas). No contexto brasileiro urbano, muitas famílias precisam ajustar as proporções — moradia e transporte consomem fatia maior — mas o princípio de separar categorias permanece válido.',
      ],
      subsections: [
        {
          id: 'metodos-orcamento',
          title: 'Métodos de orçamento',
          paragraphs: [
            'Orçamento base zero exige que cada real da renda tenha destino definido antes do mês começar. O envelope (físico ou digital) limita gastos por categoria. O método dos seis potes distribui percentuais fixos entre contas separadas. Escolha o que você consegue manter por pelo menos três meses consecutivos.',
          ],
        },
        {
          id: 'orcamento-familiar',
          title: 'Orçamento em casal e família',
          paragraphs: [
            'Quando mais de uma pessoa compartilha despesas, o orçamento exige conversa franca sobre prioridades, dívidas individuais e metas comuns. Definir quem paga o quê, se haverá conta conjunta e qual o teto de gastos discricionários de cada um evita conflitos silenciosos que explodem nas faturas.',
          ],
        },
      ],
      list: [
        'Registre gastos por pelo menos 30 dias antes de definir limites realistas.',
        'Inclua no orçamento despesas anuais diluídas mensalmente (IPVA, IPTU, material escolar).',
        'Revise o orçamento quando a renda mudar — promoção, demissão ou nascimento de filho alteram tudo.',
      ],
    },
    {
      id: 'reserva-emergencia',
      title: 'Reserva de emergência',
      paragraphs: [
        'Reserva de emergência é o colchão financeiro para imprevistos: demissão, doença, conserto urgente no carro, vazamento em casa. Não é dinheiro para viagem ou troca de celular — é para eventos que comprometem a renda ou geram despesa inesperada sem alternativa.',
        'A recomendação clássica é manter de três a seis meses de despesas essenciais. Quem tem renda variável, é autônomo ou é o único provedor da família pode precisar de até doze meses. No Brasil, onde o seguro-desemprego é limitado e o crédito pessoal é caro, subestimar a reserva é um dos erros mais comuns.',
        'Onde guardar? Priorize liquidez e segurança: Tesouro Selic, CDB com liquidez diária ou fundos DI com resgate D+0 ou D+1. A reserva não precisa render muito — precisa estar disponível quando você precisar. Só depois de completar a reserva faz sentido buscar investimentos com maior risco e prazo.',
      ],
      list: [
        'Calcule a reserva sobre despesas essenciais, não sobre a renda bruta.',
        'Reponha a reserva imediatamente após usá-la — ela não é consumível.',
        'Mantenha a reserva separada da conta corrente do dia a dia para evitar gastos acidentais.',
      ],
    },
    {
      id: 'controle-gastos',
      title: 'Controle de gastos no dia a dia',
      paragraphs: [
        'Controlar gastos não significa viver em regime de escassez permanente. Significa saber para onde o dinheiro vai e decidir conscientemente se aquele destino reflete suas prioridades. Estudos de comportamento mostram que pagamentos por aproximação e assinaturas automáticas reduzem a percepção de custo — o que facilita o estouro do orçamento.',
        'Técnicas práticas incluem: revisar faturas de cartão linha a linha, cancelar assinaturas não usadas, comparar preços antes de compras acima de um valor definido por você, usar listas no supermercado e estabelecer um dia fixo no mês para pagar contas e analisar extratos.',
        'O consumo por impulso costuma estar ligado a emoção — tédio, estresse, recompensa. Identificar seus gatilhos ajuda a criar alternativas que não envolvam gasto: caminhada, ligação para amigo, hobby sem custo. Educação financeira, promovida pelo Banco Central e pela CVM, enfatiza que conhecer o próprio comportamento é tão importante quanto conhecer taxas de juros.',
      ],
      subsections: [
        {
          id: 'gastos-fixos-variaveis',
          title: 'Gastos fixos e variáveis',
          paragraphs: [
            'Gastos fixos são previsíveis: aluguel, condomínio, escola, internet. Variáveis oscilam: alimentação fora de casa, combustível, presentes. É nos variáveis que normalmente há espaço para ajuste sem mudar radicalmente o padrão de vida. Reduzir um gasto fixo (renegociar plano de celular, trocar seguro) costuma ter impacto maior e duradouro.',
          ],
        },
      ],
    },
    {
      id: 'endividamento',
      title: 'Endividamento: causas, riscos e saída',
      paragraphs: [
        'Endividamento torna-se problema quando compromete parcelas significativas da renda, impede a formação de reserva ou exige novas dívidas para pagar as antigas. No Brasil, juros do rotativo do cartão e do cheque especial frequentemente superam 100% ao ano — um cenário em que a dívida dobra em menos de um ano se não houver amortização.',
        'As causas variam: perda de renda, emergência sem reserva, compras parceladas acumuladas, financiamentos longos demais ou falta de planejamento tributário em atividades autônomas. O primeiro passo para sair é listar todas as dívidas com saldo devedor, taxa de juros, parcela e prazo restante.',
        'Estratégias de quitação incluem a bola de neve (menor saldo primeiro, para gerar motivação) e o avalanche (maior taxa primeiro, para economizar juros). Negociar com credores, portabilidade de crédito e consolidação podem reduzir custo — mas exigem leitura atenta de contratos. Enquanto houver dívida cara, priorize quitá-la antes de investir: raramente um investimento supera juros de 80% ao ano.',
      ],
      list: [
        'Nunca pague o mínimo do cartão se puder amortizar — o rotativo é a dívida mais cara do mercado.',
        'Evite pegar empréstimo para quitar empréstimo sem reduzir a taxa efetiva.',
        'Busque orientação do Procon ou programas de renegociação em casos de superendividamento.',
      ],
    },
    {
      id: 'educacao-financeira',
      title: 'Educação financeira no Brasil',
      paragraphs: [
        'Educação financeira é o conjunto de conhecimentos, atitudes e comportamentos que permitem tomar decisões adequadas sobre recursos financeiros. O Banco Central mantém programas e materiais voltados à população, e a CVM oferece o Portal do Investidor com conteúdo gratuito sobre produtos regulados, riscos e direitos.',
        'Conceitos essenciais incluem: diferença entre taxa nominal e efetiva, custo efetivo total (CET) em empréstimos, poder dos juros compostos na poupança e no endividamento, inflação e rentabilidade real. Dominar esses fundamentos protege contra promessas de ganho fácil e esquemas de pirâmide financeira.',
        'Educação financeira é contínua. Mudanças na Selic, novas regras previdenciárias, produtos financeiros inovadores — tudo exige atualização. Reserve tempo mensal para ler uma fonte confiável: sites oficiais (.gov.br), relatórios do BCB ou material do Portal do Investidor da CVM.',
      ],
    },
    {
      id: 'planejamento-familiar',
      title: 'Planejamento financeiro familiar',
      paragraphs: [
        'Famílias enfrentam despesas que indivíduos solteiros não têm: educação dos filhos, plano de saúde familiar, possível auxílio a pais idosos. O planejamento familiar articula metas de curto prazo (férias, reforma), médio prazo (entrada de imóvel, faculdade) e longo prazo (aposentadoria dos pais responsáveis).',
        'Seguro de vida e previdência privada entram na conversa quando há dependentes. Testamento e inventário, embora pareçam distantes, fazem parte do planejamento patrimonial em famílias com bens relevantes. Conversar sobre dinheiro com filhos adolescentes — mesada, poupança para objetivo, diferença entre crédito e débito — planta bases de educação financeira para a vida adulta.',
        'Divórcio e separação alteram drasticamente as finanças. Manter documentação organizada (comprovantes de contribuição para moradia, escola, saúde) facilita acordos justos. Em uniões estáveis e casamentos, definir regime de bens impacta proteção patrimonial em caso de dissolução.',
      ],
    },
    {
      id: 'consumo-consciente',
      title: 'Consumo consciente e sustentabilidade financeira',
      paragraphs: [
        'Consumo consciente é comprar com intenção: avaliar necessidade real, qualidade, durabilidade e custo por uso — não apenas o preço na etiqueta. Um tênis barato que dura três meses pode custar mais por dia de uso que um par mais caro que dura dois anos.',
        'Práticas como a regra das 24 ou 48 horas (esperar antes de compras não essenciais), comparar custo total de propriedade (veículo inclui IPVA, seguro, manutenção) e questionar o valor emocional de marcas reduzem arrependimentos e liberam recursos para metas.',
        'Sustentabilidade financeira pessoal conecta-se à sustentabilidade ambiental: menos consumo impulsivo geralmente significa menos desperdício. Isso não é privação — é alinhar gastos com valores. Quem prioriza experiências (viagens, cursos) sobre acúmulo de objetos costuma reportar maior satisfação com o orçamento.',
      ],
    },
    {
      id: 'metas-financeiras',
      title: 'Metas financeiras e juros compostos',
      paragraphs: [
        'Metas transformam desejos vagos em planos mensuráveis. Em vez de "quero viajar", defina: "R$ 6.000 para viagem em dezembro de 2027". Com prazo e valor, você calcula o aporte mensal necessário — e os juros compostos trabalham a seu favor quando o dinheiro é investido enquanto acumula.',
        'Classifique metas por prazo: curto (até um ano), médio (um a cinco anos) e longo (acima de cinco anos). Metas de curto prazo pedem liquidez e baixo risco; metas longas permitem exposição a ativos com maior potencial de retorno, sempre dentro do seu perfil e com orientação adequada.',
        'Revise metas semestralmente. Promoção, filho, mudança de cidade — a vida altera prioridades. O que não pode faltar em nenhum cenário: reserva de emergência completa e quitação de dívidas caras. Só então acelere metas de acumulação e investimento.',
      ],
      list: [
        'Escreva metas com valor, prazo e aporte mensal estimado.',
        'Automatize transferências para contas de objetivo no dia do salário.',
        'Use simuladores de juros compostos para visualizar o crescimento do patrimônio.',
      ],
    },
  ],
  faq: [
    {
      question: 'Quanto devo guardar na reserva de emergência?',
      answer:
        'O ideal é de três a seis meses de despesas essenciais (moradia, alimentação, saúde, transporte). Autônomos e famílias com um único provedor podem precisar de até doze meses. Calcule sobre gastos necessários, não sobre a renda total.',
    },
    {
      question: 'Devo quitar dívidas ou investir primeiro?',
      answer:
        'Se a taxa da dívida supera a rentabilidade líquida esperada dos investimentos, priorize a quitação — especialmente em dívidas de cartão e cheque especial. Com dívidas caras eliminadas, direcione o valor das parcelas para reserva e investimentos.',
    },
    {
      question: 'Qual o melhor método de orçamento?',
      answer:
        'O melhor é o que você consegue manter. Orçamento base zero, envelopes ou a regra 50-30-20 funcionam se aplicados com consistência. Comece registrando gastos por 30 dias e escolha um método simples.',
    },
    {
      question: 'Onde aprender educação financeira de forma confiável?',
      answer:
        'Priorize fontes oficiais: site do Banco Central, Portal do Investidor da CVM e materiais .gov.br. Desconfie de promessas de enriquecimento rápido e cursos que vendem produtos financeiros sem transparência.',
    },
    {
      question: 'Como envolver o cônjuge no planejamento financeiro?',
      answer:
        'Agende conversas regulares sem culpa ou surpresas. Compartilhem extratos, definam metas comuns, acordem limites individuais de gasto discricionário e decidam se usarão contas conjuntas, separadas ou híbridas.',
    },
    {
      question: 'Consumo consciente significa nunca gastar com lazer?',
      answer:
        'Não. Consumo consciente é alocar recursos de acordo com prioridades — incluindo lazer e experiências, desde que dentro do orçamento e sem comprometer reserva e metas.',
    },
    {
      question: 'Como transformar metas em aportes mensais?',
      answer:
        'Defina valor alvo, prazo e taxa de rendimento esperada. Simuladores de juros compostos calculam o aporte necessário. Automatize a transferência no dia do salário para reduzir a tentação de gastar.',
    },
  ],
  glossary: [
    { term: 'Fluxo de caixa', definition: 'Movimentação de entradas e saídas de dinheiro em um período — base para orçamento e diagnóstico financeiro.' },
    { term: 'Patrimônio líquido', definition: 'Diferença entre tudo que você possui (ativos) e tudo que deve (passivos).' },
    { term: 'Reserva de emergência', definition: 'Montante líquido e de baixo risco para cobrir imprevistos sem recorrer a crédito caro.' },
    { term: 'Orçamento base zero', definition: 'Método em que cada real da renda recebe destino definido, de forma que receitas menos despesas planejadas igualam zero.' },
    { term: 'CET', definition: 'Custo Efetivo Total — taxa que inclui juros, tarifas e seguros obrigatórios em operações de crédito; permite comparar empréstimos.' },
    { term: 'Rotativo do cartão', definition: 'Modalidade de crédito quando o titular paga menos que o total da fatura — juros entre os mais altos do mercado brasileiro.' },
    { term: 'Superendividamento', definition: 'Situação em que dívidas comprometem de forma sustentada a renda e o mínimo existencial, conforme legislação consumerista.' },
    { term: 'Rentabilidade real', definition: 'Ganho acima da inflação — o que de fato aumenta o poder de compra ao longo do tempo.' },
    { term: 'Consumo consciente', definition: 'Prática de comprar com critério de necessidade, custo por uso e alinhamento com valores pessoais.' },
  ],
  sources: [SOURCES_BCB, SOURCES_CVM],
  relatedTools: [
    { label: 'Juros Compostos', href: ROUTES.jurosCompostos, description: 'Simule metas de patrimônio com aportes mensais e taxas de mercado.' },
    { label: 'Calculadora IPCA', href: ROUTES.calculadoraIpca, description: 'Veja como a inflação afeta seu poder de compra ao longo do tempo.' },
    { label: 'Aposentadoria', href: ROUTES.aposentadoria, description: 'Planeje complemento de renda para a aposentadoria com simulações.' },
  ],
  relatedCategories: [
    { label: 'Investimentos', href: ROUTES.categoria('investimentos') },
    { label: 'Aposentadoria', href: ROUTES.categoria('aposentadoria') },
  ],
  relatedArticles: [
    { label: 'Como sair das dívidas', href: ROUTES.blogPost('como-sair-das-dividas') },
    { label: 'Quanto investir para se aposentar', href: ROUTES.blogPost('quanto-investir-para-se-aposentar') },
    { label: 'Como calcular juros compostos', href: ROUTES.blogPost('como-calcular-juros-compostos') },
  ],
};
