import { BookOpen } from 'lucide-react';
import { CONTENT_UPDATED } from '../../constants/eeat';

export interface MethodologyItem {
  label: string;
  value: string;
}

export interface MethodologyContent {
  title: string;
  formulas: string[];
  premises: string[];
  references: string[];
  liveParams?: MethodologyItem[];
}

export const METHODOLOGY: Record<string, MethodologyContent> = {
  juros: {
    title: 'Como calculamos os juros compostos',
    formulas: [
      'Montante mensal: M = M × (1 + i) + aporte',
      'Conversão anual → mensal: i_m = (1 + i_a)^(1/12) − 1',
      'Poder de compra real: M_real = M / (1 + IPCA_m)^n',
      'IR regressivo (opcional): alíquota de 22,5% a 15% conforme prazo',
    ],
    premises: [
      'Capitalização composta mensal com aportes no fim de cada período.',
      'Poupança: 0,5% a.m. + TR se Selic > 8,5%; senão 70% da Selic.',
      'CDI de referência: Selic − 0,10 p.p.',
      'Taxas de administração, performance e custódia reduzem a rentabilidade líquida.',
    ],
    references: [
      'Banco Central do Brasil — regras da poupança',
      'Lei nº 11.033/2004 — IR regressivo em renda fixa',
    ],
  },
  'clt-pj': {
    title: 'Como calculamos CLT vs PJ',
    formulas: [
      'CLT líquido = bruto − INSS − IRRF',
      'Renda real anual CLT = líquido × 13,33 + FGTS + benefícios × 12',
      'PJ mínimo = (renda equivalente + contador) / (1 − alíquota regime)',
    ],
    premises: [
      'INSS e IRRF progressivos conforme tabelas vigentes.',
      'FGTS: 8% sobre salário bruto mensal.',
      'Regimes PJ: Simples Anexo III (6%), MEI ou Lucro Presumido (16,33%).',
    ],
    references: [
      'Lei Complementar nº 123/2006 — Simples Nacional',
      'Consolidação das Leis do Trabalho (CLT)',
      'Receita Federal — tabelas INSS e IRRF',
    ],
  },
  aposentadoria: {
    title: 'Como calculamos a aposentadoria',
    formulas: [
      'Patrimônio = lacuna de renda / taxa de saque mensal',
      'Lacuna = renda desejada − cobertura previdenciária',
      'Aporte mensal: fórmula de anuidade sobre déficit patrimonial',
      'Taxa real = (1 + Selic − IPCA) capitalizada mensalmente',
    ],
    premises: [
      'Teto INSS utilizado como teto de benefício estimado.',
      'Regra de saque padrão: 0,35% a.m. (~4,2% a.a.) sobre patrimônio.',
      'Cenários conservador/moderado/agressivo usam taxas reais fixas.',
    ],
    references: [
      'Instituto Nacional do Seguro Social (INSS)',
      'Ministério da Previdência Social',
    ],
  },
  rescisao: {
    title: 'Como calculamos a rescisão',
    formulas: [
      'Saldo de salário = (salário / 30) × dias trabalhados',
      '13º proporcional = (salário / 12) × avos no ano',
      'Férias + 1/3 = férias proporcionais × 1,333…',
      'FGTS = 8% × salário × meses; multa 40% (sem justa) ou 20% (acordo)',
    ],
    premises: [
      'Avos calculados por meses trabalhados no período aquisitivo.',
      'Com justa causa: FGTS retido; pedido de demissão: sem multa.',
      'Aviso prévio indenizado somado quando informado no modo avançado.',
    ],
    references: [
      'CLT — arts. 477 e 477-A (rescisão contratual)',
      'Lei nº 13.467/2017 — reforma trabalhista',
    ],
  },
  conversor: {
    title: 'Como calculamos a conversão',
    formulas: [
      'Valor convertido = (valor × cota origem em BRL) / cota destino em BRL',
      'Turismo: cotação ask quando disponível; senão spread estimado +4,5%',
      'Paralelo: spread estimado +2,8% sobre comercial',
    ],
    premises: [
      'Matriz bidirecional com BRL como moeda lastro.',
      'Cache local de 30 minutos; fallback estático se API indisponível.',
    ],
    references: [
      'AwesomeAPI — cotações de mercado',
      'Banco Central do Brasil',
    ],
  },
};

interface MethodologyPanelProps {
  toolId: keyof typeof METHODOLOGY;
  liveParams?: MethodologyItem[];
}

export default function MethodologyPanel({ toolId, liveParams }: MethodologyPanelProps) {
  const content = METHODOLOGY[toolId];
  if (!content) return null;

  const params = liveParams ?? content.liveParams ?? [];

  return (
    <details className="bg-white border border-slate-100 rounded-2xl shadow-xs overflow-hidden group">
      <summary className="flex items-center gap-2 px-5 py-4 cursor-pointer list-none hover:bg-slate-50/80 transition-colors">
        <BookOpen className="w-4 h-4 text-[#800020] shrink-0" aria-hidden="true" />
        <span className="font-bold text-sm text-slate-900">{content.title}</span>
        <span className="ml-auto text-[10px] text-slate-400 font-mono">Rev. {CONTENT_UPDATED}</span>
      </summary>
      <div className="px-5 pb-5 pt-0 border-t border-slate-50 space-y-4 text-xs text-slate-600 leading-relaxed">
        {params.length > 0 && (
          <div>
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px] mb-2">
              Parâmetros desta simulação
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {params.map((p) => (
                <li key={p.label} className="flex justify-between gap-2 bg-slate-50 rounded-lg px-2.5 py-1.5">
                  <span className="text-slate-500">{p.label}</span>
                  <span className="font-semibold text-slate-800 font-mono">{p.value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px] mb-2">Fórmulas</h4>
          <ul className="list-disc pl-4 space-y-1 font-mono text-[11px]">
            {content.formulas.map((f) => (
              <li key={f.slice(0, 30)}>{f}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px] mb-2">Premissas</h4>
          <ul className="list-disc pl-4 space-y-1">
            {content.premises.map((p) => (
              <li key={p.slice(0, 30)}>{p}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px] mb-2">Referências</h4>
          <ul className="list-disc pl-4 space-y-1 text-slate-500">
            {content.references.map((r) => (
              <li key={r.slice(0, 30)}>{r}</li>
            ))}
          </ul>
        </div>
      </div>
    </details>
  );
}
