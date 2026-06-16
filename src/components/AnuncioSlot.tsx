import { Eye } from 'lucide-react';

export type AnuncioDimensao = '728x90' | '300x250' | '300x600' | 'horizontal-flexible';

interface AnuncioSlotProps {
  dimensao: AnuncioDimensao;
  className?: string;
  /** Identificador para integração futura com Google AdSense */
  slotId?: string;
}

const sizeMap: Record<
  AnuncioDimensao,
  { widthLabel: string; heightLabel: string; containerStyle: string; minHeight: number }
> = {
  '728x90': {
    widthLabel: '728px',
    heightLabel: '90px',
    containerStyle: 'min-h-[90px] max-w-[728px] w-full',
    minHeight: 90,
  },
  '300x250': {
    widthLabel: '300px',
    heightLabel: '250px',
    containerStyle: 'min-h-[250px] max-w-[300px] w-full',
    minHeight: 250,
  },
  '300x600': {
    widthLabel: '300px',
    heightLabel: '600px',
    containerStyle: 'min-h-[400px] max-w-[300px] w-full md:min-h-[600px]',
    minHeight: 600,
  },
  'horizontal-flexible': {
    widthLabel: '100%',
    heightLabel: 'Ajuste Automático',
    containerStyle: 'min-h-[100px] w-full',
    minHeight: 100,
  },
};

export default function AnuncioSlot({ dimensao, className = '', slotId }: AnuncioSlotProps) {
  const { widthLabel, heightLabel, containerStyle, minHeight } = sizeMap[dimensao];

  return (
    <aside
      className={`mx-auto ${containerStyle} ${className} select-none`}
      role="complementary"
      aria-label={`Espaço reservado para publicidade ${widthLabel} por ${heightLabel}`}
      data-ad-slot={slotId ?? dimensao}
      data-ad-format={dimensao}
      style={{ minHeight }}
    >
      <div className="relative group overflow-hidden border-2 border-dashed border-slate-200 hover:border-[#800020]/30 rounded-2xl bg-slate-50 p-4 transition-all flex flex-col items-center justify-center text-center h-full">
        <div
          className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(45deg,#800020_12%,transparent_12%,transparent_50%,#800020_50%,#800020_62%,transparent_62%,transparent),linear-gradient(135deg,#800020_12%,transparent_12%,transparent_50%,#800020_50%,#800020_62%,transparent_62%,transparent)] bg-[size:20px_20px]"
          aria-hidden="true"
        />

        <div className="z-10 flex flex-col items-center gap-1.5">
          <div className="inline-flex items-center gap-1 bg-slate-200/60 text-slate-400 group-hover:bg-[#800020]/10 group-hover:text-[#800020] px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider transition-colors uppercase font-medium">
            <Eye className="w-3 h-3" aria-hidden="true" />
            <span>AdSense Slot</span>
          </div>
          <div className="font-sans text-xs font-semibold text-slate-600 group-hover:text-slate-800 transition-colors">
            Espaço Reservado para Publicidade
          </div>
          <div className="font-mono text-[10px] text-slate-400" aria-hidden="true">
            {widthLabel} × {heightLabel}
          </div>
        </div>

        <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-slate-300" aria-hidden="true" />
        <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-slate-300" aria-hidden="true" />
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-slate-300" aria-hidden="true" />
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-slate-300" aria-hidden="true" />
      </div>
    </aside>
  );
}
