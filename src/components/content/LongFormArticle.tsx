import type { ContentSection } from '../../content/types';

interface LongFormArticleProps {
  sections: ContentSection[];
}

export default function LongFormArticle({ sections }: LongFormArticleProps) {
  return (
    <article className="flex flex-col gap-8 text-sm text-slate-600 leading-relaxed">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-24">
          <h2 className="text-lg font-extrabold text-slate-900 mb-3 tracking-tight">{section.title}</h2>
          {section.paragraphs.map((p) => (
            <p key={p.slice(0, 48)} className="mb-3 max-w-3xl">
              {p}
            </p>
          ))}
          {section.list && (
            <ul className="list-disc pl-5 space-y-1.5 mt-2 max-w-3xl">
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {section.subsections?.map((sub) => {
            const Tag = sub.level === 4 ? 'h4' : 'h3';
            return (
              <div key={sub.id} id={sub.id} className="mt-5 scroll-mt-24">
                <Tag className="font-bold text-slate-900 mb-2 text-base">{sub.title}</Tag>
                {sub.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)} className="mb-2 max-w-3xl">
                    {p}
                  </p>
                ))}
                {sub.list && (
                  <ul className="list-disc pl-5 space-y-1 mt-2 max-w-3xl">
                    {sub.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </section>
      ))}
    </article>
  );
}
