import type { ContentSection } from '../../content/types';

interface TableOfContentsProps {
  sections: ContentSection[];
  title?: string;
}

export default function TableOfContents({ sections, title = 'Neste guia' }: TableOfContentsProps) {
  const items = sections.flatMap((s) => {
    const main = { id: s.id, title: s.title, level: 2 as const };
    const subs =
      s.subsections?.map((sub) => ({
        id: sub.id,
        title: sub.title,
        level: (sub.level ?? 3) as 3 | 4,
      })) ?? [];
    return [main, ...subs];
  });

  if (items.length < 3) return null;

  return (
    <nav
      className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-8"
      aria-label="Índice do conteúdo"
    >
      <h2 className="text-sm font-extrabold text-slate-900 mb-3">{title}</h2>
      <ol className="space-y-1.5 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'pl-4' : item.level === 4 ? 'pl-8' : ''}>
            <a
              href={`#${item.id}`}
              className="text-slate-600 hover:text-[#800020] transition-colors leading-snug"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
