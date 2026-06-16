import type { GlossaryItem } from '../../content/types';

interface GlossarySectionProps {
  items: GlossaryItem[];
  title?: string;
}

export default function GlossarySection({ items, title = 'Glossário' }: GlossarySectionProps) {
  if (items.length === 0) return null;

  return (
    <section className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs" aria-labelledby="glossario-heading">
      <h2 id="glossario-heading" className="text-lg font-extrabold text-slate-900 mb-4">
        {title}
      </h2>
      <dl className="space-y-4">
        {items.map((item) => (
          <div key={item.term}>
            <dt className="font-bold text-sm text-slate-900">{item.term}</dt>
            <dd className="mt-1 text-sm text-slate-600 leading-relaxed">{item.definition}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
