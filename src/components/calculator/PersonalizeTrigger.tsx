import { Settings2 } from 'lucide-react';

interface PersonalizeTriggerProps {
  isAdvanced: boolean;
  onOpen: () => void;
  onClose: () => void;
  advancedSectionId?: string;
}

export default function PersonalizeTrigger({
  isAdvanced,
  onOpen,
  onClose,
  advancedSectionId = 'personalizar-calculo',
}: PersonalizeTriggerProps) {
  if (isAdvanced) {
    return (
      <button
        type="button"
        onClick={onClose}
        className="w-full text-center text-[11px] font-semibold text-slate-500 hover:text-[#800020] py-2 transition-colors cursor-pointer"
      >
        ← Voltar ao cálculo rápido
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        onOpen();
        requestAnimationFrame(() => {
          document.getElementById(advancedSectionId)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
      }}
      className="w-full flex items-center justify-center gap-1.5 text-[11px] font-bold text-[#800020] hover:text-[#600018] py-2.5 px-3 rounded-xl border border-dashed border-[#800020]/25 hover:border-[#800020]/40 hover:bg-rose-50/40 transition-all cursor-pointer min-h-[2.75rem]"
    >
      <Settings2 className="w-3.5 h-3.5" aria-hidden="true" />
      Personalizar cálculo
    </button>
  );
}
