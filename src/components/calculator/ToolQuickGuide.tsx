import type { ToolGuideContent } from '../../config/toolGuides';

interface ToolQuickGuideProps {
  guide: ToolGuideContent;
}

export default function ToolQuickGuide({ guide }: ToolQuickGuideProps) {
  const items = [
    { q: 'O que calcula?', a: guide.oQueCalcula },
    { q: 'Quem deve usar?', a: guide.quemDeveUsar },
    { q: 'O que informar?', a: guide.dadosNecessarios },
    { q: 'O que você recebe?', a: guide.resultado },
  ];

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white/80 p-3.5 sm:p-4 space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px] leading-snug">
        {items.map((item) => (
          <div key={item.q} className="min-w-0">
            <span className="font-bold text-slate-800 block">{item.q}</span>
            <span className="text-slate-600">{item.a}</span>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-slate-500 border-t border-slate-100 pt-2.5 font-medium">{guide.exemplo}</p>
    </div>
  );
}
