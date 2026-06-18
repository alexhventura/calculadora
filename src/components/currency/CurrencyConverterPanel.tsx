import { ArrowRightLeft } from 'lucide-react';
import CurrencySelect from '../CurrencySelect';
import type { CurrencyInfo } from '../../constants/currencies';
import { formatConvertedValue } from '../../utils/formatExchange';

interface CurrencyConverterPanelProps {
  value: number;
  onValueChange: (v: number) => void;
  from: string;
  to: string;
  onFromChange: (code: string) => void;
  onToChange: (code: string) => void;
  onSwap: () => void;
  result: number;
  currencies: CurrencyInfo[];
}

export default function CurrencyConverterPanel({
  value,
  onValueChange,
  from,
  to,
  onFromChange,
  onToChange,
  onSwap,
  result,
  currencies,
}: CurrencyConverterPanelProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="conversor-valor" className="text-xs font-semibold text-slate-700">
          Valor a converter
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-2.5 text-xs text-slate-600 font-bold font-mono" aria-hidden="true">
            {from}
          </span>
          <input
            id="conversor-valor"
            type="number"
            min={0}
            value={value || ''}
            onChange={(e) => onValueChange(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full pl-14 pr-4 py-2.5 bg-white border border-slate-200 focus:border-amber-500 text-slate-900 text-sm font-semibold rounded-xl focus:outline-hidden transition-all"
            placeholder="0"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2">
        <CurrencySelect
          id="conversor-de-moeda"
          label="De"
          value={from}
          onChange={onFromChange}
          currencies={currencies}
        />
        <button
          type="button"
          onClick={onSwap}
          className="p-2.5 min-h-[2.75rem] border border-slate-200 hover:border-amber-500 hover:bg-amber-50 text-slate-500 hover:text-amber-700 rounded-xl transition-all cursor-pointer shrink-0 self-center"
          title="Inverter moedas"
          aria-label="Inverter moedas de origem e destino"
        >
          <ArrowRightLeft className="w-4 h-4 mx-auto" />
        </button>
        <CurrencySelect
          id="conversor-para-moeda"
          label="Para"
          value={to}
          onChange={onToChange}
          currencies={currencies}
        />
      </div>

      <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-5 flex flex-col items-center text-center">
        <span className="text-[10px] font-semibold tracking-wide text-amber-700 uppercase">Resultado</span>
        <p className="font-mono text-xl md:text-2xl font-extrabold text-[#704214] mt-1 break-all">
          {formatConvertedValue(result, to)}
        </p>
        <p className="text-[10px] text-slate-500 mt-1">
          {from} → {to}
        </p>
      </div>
    </div>
  );
}
