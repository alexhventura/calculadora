import { CONTENT_AUTHOR, CONTENT_UPDATED, EDUCATIONAL_DISCLAIMER, CALCULATION_TRANSPARENCY } from '../../constants/eeat';

interface EeatBlockProps {
  sources?: string[];
  updatedAt?: string;
}

export default function EeatBlock({ sources = [], updatedAt }: EeatBlockProps) {
  const displayDate = updatedAt ?? CONTENT_UPDATED;
  return (
    <aside
      className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-xs text-slate-600 space-y-3 font-sans"
      aria-label="Informações sobre autoridade e transparência do conteúdo"
    >
      <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px]">
        <span>
          <strong className="text-slate-800">Autor:</strong> {CONTENT_AUTHOR.name}
        </span>
        <span>
          <strong className="text-slate-800">Atualizado em:</strong>{' '}
          {new Date(displayDate).toLocaleDateString('pt-BR')}
        </span>
      </div>
      <p className="leading-relaxed">{EDUCATIONAL_DISCLAIMER}</p>
      <p className="leading-relaxed text-slate-500">{CALCULATION_TRANSPARENCY}</p>
      {sources.length > 0 && (
        <div>
          <strong className="text-slate-800 block mb-1">Fontes consultadas:</strong>
          <ul className="list-disc pl-4 space-y-0.5 text-slate-500">
            {sources.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
