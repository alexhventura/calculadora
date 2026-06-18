import { Eraser, Download, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface CalculatorActionBarProps {
  onClear: () => void;
  onSavePdf: () => Promise<void>;
  clearLabel?: string;
}

export default function CalculatorActionBar({
  onClear,
  onSavePdf,
  clearLabel = 'Limpar dados',
}: CalculatorActionBarProps) {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSavePdf();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-100">
      <button
        type="button"
        onClick={onClear}
        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 hover:border-slate-300 transition-all min-h-[2.75rem] cursor-pointer"
      >
        <Eraser className="w-4 h-4" aria-hidden="true" />
        {clearLabel}
      </button>
      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#800020] text-white text-xs font-bold hover:bg-[#600018] disabled:opacity-60 transition-all min-h-[2.75rem] cursor-pointer"
      >
        {saving ? (
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
        ) : (
          <Download className="w-4 h-4" aria-hidden="true" />
        )}
        {saving ? 'Gerando PDF…' : 'Salvar dados (PDF)'}
      </button>
    </div>
  );
}
