import type { ActiveTool } from '../../utils/calculations/toolCalculations';
import type { TaxaTipo } from '../../types';
import type {
  AdvancedCalculatorOptions,
  AporteFrequencia,
  CenarioInvestimento,
  InflacaoModo,
  ModoProjecaoAposentadoria,
  RegimePj,
  TipoBeneficioAposentadoria,
  TributacaoModo,
} from '../../types/calculator';
import {
  calcularTaxaPoupancaVal,
  convertAnualParaMensal,
  convertMensalParaAnual,
} from '../../utils/finance';
import { formatMilhar } from '../../utils/format';
import AdvancedSection from './AdvancedSection';
import FieldHint from './FieldHint';

const inputClass =
  'w-full px-3 py-2 bg-white border border-slate-200 focus:border-[#800020] text-slate-900 text-xs font-semibold rounded-xl focus:outline-hidden transition-all';
const labelClass = 'text-[11px] font-semibold text-slate-700 flex items-center';

interface JurosAdvancedUiProps {
  taxaPeriodo: 'anual' | 'mensal';
  taxaTipo: TaxaTipo;
  taxaAnual: number;
  selicRate: number;
  onTaxaPeriodoChange: (p: 'anual' | 'mensal') => void;
  onTaxaTipoChange: (t: TaxaTipo) => void;
  onTaxaAnualChange: (v: number) => void;
}

interface AposentadoriaAdvancedUiProps {
  patrimonioStr: string;
  salarioStr: string;
  onPatrimonioChange: (s: string) => void;
  onSalarioChange: (s: string) => void;
}

interface CalculatorAdvancedFieldsProps {
  activeTool: ActiveTool;
  advanced: AdvancedCalculatorOptions;
  onChange: (patch: Partial<AdvancedCalculatorOptions>) => void;
  aposentadoriaSalarioAtualNum: number;
  defaultOpen?: boolean;
  sectionId?: string;
  jurosUi?: JurosAdvancedUiProps;
  aposentadoriaUi?: AposentadoriaAdvancedUiProps;
}

function FieldLabel({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <label className={labelClass}>
      {children}
      {hint ? <FieldHint text={hint} /> : null}
    </label>
  );
}

export default function CalculatorAdvancedFields({
  activeTool,
  advanced,
  onChange,
  aposentadoriaSalarioAtualNum,
  defaultOpen = true,
  sectionId = 'personalizar-calculo',
  jurosUi,
  aposentadoriaUi,
}: CalculatorAdvancedFieldsProps) {
  const patchJuros = (j: Partial<AdvancedCalculatorOptions['juros']>) =>
    onChange({ juros: { ...advanced.juros, ...j } });
  const patchCltPj = (c: Partial<AdvancedCalculatorOptions['cltPj']>) =>
    onChange({ cltPj: { ...advanced.cltPj, ...c } });
  const patchApos = (a: Partial<AdvancedCalculatorOptions['aposentadoria']>) =>
    onChange({ aposentadoria: { ...advanced.aposentadoria, ...a } });
  const patchRescisao = (r: Partial<AdvancedCalculatorOptions['rescisao']>) =>
    onChange({ rescisao: { ...advanced.rescisao, ...r } });

  if (activeTool === 'juros' && jurosUi) {
    const j = advanced.juros;
    const { taxaPeriodo, taxaTipo, taxaAnual, selicRate } = jurosUi;
    return (
      <AdvancedSection defaultOpen={defaultOpen} id={sectionId}>
        <div className="flex flex-col gap-1">
          <FieldLabel hint="Escolha se a taxa é ao ano ou ao mês.">Taxa ao ano ou ao mês</FieldLabel>
          <div className="grid grid-cols-2 gap-1 bg-slate-100/70 p-1 rounded-xl">
            {(['anual', 'mensal'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => jurosUi.onTaxaPeriodoChange(p)}
                className={`text-[10px] py-1.5 font-bold rounded-lg transition-all cursor-pointer ${
                  taxaPeriodo === p ? 'bg-white text-[#800020] shadow-xs' : 'text-slate-600'
                }`}
              >
                {p === 'anual' ? 'Ao ano' : 'Ao mês'}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <FieldLabel hint="Use referências de mercado ou informe manualmente.">Referência de rendimento</FieldLabel>
          <div className="grid grid-cols-2 gap-1.5">
            {(
              [
                ['manual', 'Manual'],
                ['poupanca', 'Poupança'],
                ['selic', 'Selic'],
                ['cdi', 'CDI'],
              ] as const
            ).map(([tipo, label]) => (
              <button
                key={tipo}
                type="button"
                onClick={() => jurosUi.onTaxaTipoChange(tipo)}
                className={`text-[10px] font-bold py-2 rounded-lg border transition-all cursor-pointer ${
                  taxaTipo === tipo
                    ? 'border-[#800020] bg-rose-50 text-[#800020]'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <FieldLabel>Frequência dos aportes</FieldLabel>
          <select
            value={j.aporteFrequencia}
            onChange={(e) => patchJuros({ aporteFrequencia: e.target.value as AporteFrequencia })}
            className={inputClass}
          >
            <option value="mensal">Mensal</option>
            <option value="quinzenal">Quinzenal</option>
            <option value="semanal">Semanal</option>
            <option value="anual">Anual</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <FieldLabel>Período da taxa</FieldLabel>
          <select
            value={j.taxaPeriodoExtendido}
            onChange={(e) =>
              patchJuros({ taxaPeriodoExtendido: e.target.value as 'anual' | 'mensal' | 'diaria' })
            }
            className={inputClass}
          >
            <option value="anual">Anual</option>
            <option value="mensal">Mensal</option>
            <option value="diaria">Diária</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <FieldLabel>Inflação</FieldLabel>
          <select
            value={j.inflacaoModo}
            onChange={(e) => patchJuros({ inflacaoModo: e.target.value as InflacaoModo })}
            className={inputClass}
          >
            <option value="ipca_api">IPCA ao vivo (BCB)</option>
            <option value="ipca_manual">IPCA manual</option>
            <option value="none">Desconsiderar inflação</option>
          </select>
        </div>
        {j.inflacaoModo === 'ipca_manual' && (
          <div className="flex flex-col gap-1">
            <FieldLabel>IPCA manual (% ao ano)</FieldLabel>
            <input
              type="number"
              step="0.01"
              min="0"
              value={j.inflacaoManual}
              onChange={(e) => patchJuros({ inflacaoManual: parseFloat(e.target.value) || 0 })}
              className={inputClass}
            />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <FieldLabel>Tributação sobre ganhos</FieldLabel>
          <select
            value={j.tributacao}
            onChange={(e) => patchJuros({ tributacao: e.target.value as TributacaoModo })}
            className={inputClass}
          >
            <option value="none">Sem impostos</option>
            <option value="ir_regressivo">IR regressivo (renda fixa)</option>
            <option value="ir_custom">IR personalizado (%)</option>
          </select>
        </div>
        {j.tributacao === 'ir_custom' && (
          <div className="flex flex-col gap-1">
            <FieldLabel>Alíquota IR (%)</FieldLabel>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={j.irCustomPercent}
              onChange={(e) => patchJuros({ irCustomPercent: parseFloat(e.target.value) || 0 })}
              className={inputClass}
            />
          </div>
        )}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-1">
            <FieldLabel>Admin. (% a.a.)</FieldLabel>
            <input
              type="number"
              step="0.01"
              min="0"
              value={j.taxaAdminAnual}
              onChange={(e) => patchJuros({ taxaAdminAnual: parseFloat(e.target.value) || 0 })}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <FieldLabel>Performance (%)</FieldLabel>
            <input
              type="number"
              step="0.01"
              min="0"
              value={j.taxaPerformanceAnual}
              onChange={(e) => patchJuros({ taxaPerformanceAnual: parseFloat(e.target.value) || 0 })}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <FieldLabel>Custódia (%)</FieldLabel>
            <input
              type="number"
              step="0.01"
              min="0"
              value={j.taxaCustodiaAnual}
              onChange={(e) => patchJuros({ taxaCustodiaAnual: parseFloat(e.target.value) || 0 })}
              className={inputClass}
            />
          </div>
        </div>
        <p className="text-[10px] text-slate-500 font-mono">
          Taxa {taxaPeriodo === 'anual' ? 'anual' : 'mensal'}: {taxaAnual.toFixed(2)}% →{' '}
          {taxaPeriodo === 'anual'
            ? `${convertAnualParaMensal(taxaAnual).toFixed(3)}% ao mês`
            : `${convertMensalParaAnual(taxaAnual).toFixed(2)}% ao ano`}
          {taxaTipo === 'poupanca' && ` · Poupança ref. ${calcularTaxaPoupancaVal(selicRate).toFixed(2)}%`}
        </p>
      </AdvancedSection>
    );
  }

  if (activeTool === 'clt-pj') {
    const c = advanced.cltPj;
    return (
      <AdvancedSection defaultOpen={defaultOpen} id={sectionId}>
        <div className="flex flex-col gap-1">
          <FieldLabel hint="Simples, MEI ou Lucro Presumido alteram o imposto estimado.">Regime PJ</FieldLabel>
          <select
            value={c.regimePj}
            onChange={(e) => patchCltPj({ regimePj: e.target.value as RegimePj })}
            className={inputClass}
          >
            <option value="simples_6">Simples Nacional — Anexo III (6%)</option>
            <option value="mei">MEI (DAS fixo ~R$ 70/mês)</option>
            <option value="lucro_presumido">Lucro Presumido (~16,33%)</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <FieldLabel>Contador mensal (R$)</FieldLabel>
          <input
            type="text"
            inputMode="numeric"
            value={formatMilhar(String(c.contadorMensal))}
            onChange={(e) => patchCltPj({ contadorMensal: parseFloat(e.target.value.replace(/\D/g, '')) || 0 })}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <FieldLabel hint="Compare uma proposta PJ que você já recebeu.">Faturamento PJ informado</FieldLabel>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Opcional"
            value={c.faturamentoPjManual != null ? formatMilhar(String(c.faturamentoPjManual)) : ''}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, '');
              patchCltPj({ faturamentoPjManual: raw ? parseFloat(raw) : null });
            }}
            className={inputClass}
          />
        </div>
        <label className="flex items-center gap-2 text-[11px] text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={c.incluirFgtsComparativo}
            onChange={(e) => patchCltPj({ incluirFgtsComparativo: e.target.checked })}
            className="accent-[#800020] rounded"
          />
          Incluir FGTS na equivalência CLT
        </label>
      </AdvancedSection>
    );
  }

  if (activeTool === 'aposentadoria') {
    const a = advanced.aposentadoria;
    return (
      <AdvancedSection defaultOpen={defaultOpen} id={sectionId}>
        {aposentadoriaUi && (
          <>
            <div className="flex flex-col gap-1">
              <FieldLabel hint="Quanto você já tem guardado hoje.">Quanto já guardou (R$)</FieldLabel>
              <input
                type="text"
                inputMode="numeric"
                value={aposentadoriaUi.patrimonioStr}
                onChange={(e) => aposentadoriaUi.onPatrimonioChange(formatMilhar(e.target.value))}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <FieldLabel hint="Usado na projeção por salário atual.">Salário atual (R$)</FieldLabel>
              <input
                type="text"
                inputMode="numeric"
                value={aposentadoriaUi.salarioStr}
                onChange={(e) => aposentadoriaUi.onSalarioChange(formatMilhar(e.target.value))}
                className={inputClass}
              />
            </div>
          </>
        )}
        <div className="flex flex-col gap-1">
          <FieldLabel>Tipo de benefício</FieldLabel>
          <select
            value={a.tipoBeneficio}
            onChange={(e) => patchApos({ tipoBeneficio: e.target.value as TipoBeneficioAposentadoria })}
            className={inputClass}
          >
            <option value="inss">INSS</option>
            <option value="servidor">Servidor público</option>
            <option value="previdencia_privada">Previdência privada (PGBL/VGBL)</option>
            <option value="independente">Planejamento independente</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <FieldLabel>Forma de projeção</FieldLabel>
          <select
            value={a.modoProjecao}
            onChange={(e) => patchApos({ modoProjecao: e.target.value as ModoProjecaoAposentadoria })}
            className={inputClass}
          >
            <option value="renda_alvo">Renda mensal alvo</option>
            <option value="salario_atual">Manter salário atual</option>
            <option value="salario_medio">Salário médio informado</option>
          </select>
        </div>
        {a.modoProjecao === 'salario_medio' && (
          <div className="flex flex-col gap-1">
            <FieldLabel>Salário médio (R$)</FieldLabel>
            <input
              type="text"
              inputMode="numeric"
              value={formatMilhar(String(a.salarioMedio))}
              onChange={(e) =>
                patchApos({ salarioMedio: parseFloat(e.target.value.replace(/\D/g, '')) || 0 })
              }
              className={inputClass}
            />
          </div>
        )}
        {a.modoProjecao === 'salario_atual' && (
          <p className="text-[10px] text-slate-500">
            Salário atual: R$ {formatMilhar(String(aposentadoriaSalarioAtualNum))}
          </p>
        )}
        <div className="flex flex-col gap-1">
          <FieldLabel>Cenário de investimento</FieldLabel>
          <select
            value={a.cenario}
            onChange={(e) => patchApos({ cenario: e.target.value as CenarioInvestimento })}
            className={inputClass}
          >
            <option value="conservador">Conservador (3% real ao ano)</option>
            <option value="moderado">Moderado (5% real ao ano)</option>
            <option value="agressivo">Agressivo (8% real ao ano)</option>
            <option value="personalizado">Personalizado</option>
          </select>
        </div>
        {a.cenario === 'personalizado' && (
          <div className="flex flex-col gap-1">
            <FieldLabel>Ganho real personalizado (% ao ano)</FieldLabel>
            <input
              type="number"
              step="0.1"
              min="0"
              value={a.taxaRealPersonalizada}
              onChange={(e) => patchApos({ taxaRealPersonalizada: parseFloat(e.target.value) || 0 })}
              className={inputClass}
            />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <FieldLabel hint="Quanto do patrimônio você retira por mês na aposentadoria.">
            Retirada mensal (% do patrimônio)
          </FieldLabel>
          <input
            type="number"
            step="0.01"
            min="0.1"
            max="2"
            value={a.taxaSaqueMensal}
            onChange={(e) => patchApos({ taxaSaqueMensal: parseFloat(e.target.value) || 0.35 })}
            className={inputClass}
          />
        </div>
      </AdvancedSection>
    );
  }

  if (activeTool === 'rescisao') {
    const r = advanced.rescisao;
    return (
      <AdvancedSection defaultOpen={defaultOpen} id={sectionId}>
        <label className="flex items-center gap-2 text-[11px] text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={r.usarPeriodoManual}
            onChange={(e) => patchRescisao({ usarPeriodoManual: e.target.checked })}
            className="accent-[#800020] rounded"
          />
          Informar meses e dias manualmente
        </label>
        {r.usarPeriodoManual && (
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <FieldLabel>Meses trabalhados</FieldLabel>
              <input
                type="number"
                min="1"
                max="600"
                value={r.mesesManual}
                onChange={(e) => patchRescisao({ mesesManual: parseInt(e.target.value) || 1 })}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <FieldLabel>Dias no último mês</FieldLabel>
              <input
                type="number"
                min="1"
                max="30"
                value={r.diasManual}
                onChange={(e) => patchRescisao({ diasManual: parseInt(e.target.value) || 1 })}
                className={inputClass}
              />
            </div>
          </div>
        )}
        <label className="flex items-center gap-2 text-[11px] text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={r.feriasVencidas}
            onChange={(e) => patchRescisao({ feriasVencidas: e.target.checked })}
            className="accent-[#800020] rounded"
          />
          Férias vencidas (período completo + 1/3)
        </label>
        <label className="flex items-center gap-2 text-[11px] text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={r.avisoPrevioIndenizado}
            onChange={(e) => patchRescisao({ avisoPrevioIndenizado: e.target.checked })}
            className="accent-[#800020] rounded"
          />
          Aviso prévio indenizado
        </label>
        {r.avisoPrevioIndenizado && (
          <div className="flex flex-col gap-1">
            <FieldLabel>Dias de aviso prévio</FieldLabel>
            <input
              type="number"
              min="0"
              max="90"
              value={r.avisoPrevioDias}
              onChange={(e) => patchRescisao({ avisoPrevioDias: parseInt(e.target.value) || 0 })}
              className={inputClass}
            />
          </div>
        )}
        <label className="flex items-center gap-2 text-[11px] text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={r.usarVerbasManuais}
            onChange={(e) => patchRescisao({ usarVerbasManuais: e.target.checked })}
            className="accent-[#800020] rounded"
          />
          Informar verbas manualmente
        </label>
        {r.usarVerbasManuais && (
          <div className="grid grid-cols-1 gap-2">
            {(
              [
                ['manualSaldoSalario', 'Saldo de salário'],
                ['manualDecimoTerceiro', '13º proporcional'],
                ['manualFerias', 'Férias + 1/3'],
              ] as const
            ).map(([key, label]) => (
              <div key={key} className="flex flex-col gap-1">
                <FieldLabel>{label} (R$)</FieldLabel>
                <input
                  type="text"
                  inputMode="numeric"
                  value={r[key] != null ? formatMilhar(String(r[key])) : ''}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, '');
                    patchRescisao({ [key]: raw ? parseFloat(raw) : null });
                  }}
                  className={inputClass}
                />
              </div>
            ))}
          </div>
        )}
      </AdvancedSection>
    );
  }

  return null;
}
