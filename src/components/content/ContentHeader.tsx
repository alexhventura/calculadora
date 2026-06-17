interface ContentHeaderProps {
  h1: string;
  intro: string;
  author: string;
  updatedAt: string;
  readTimeMinutes?: number;
}

export default function ContentHeader({ h1, intro, author, updatedAt, readTimeMinutes }: ContentHeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-3">
        <time dateTime={updatedAt}>
          Atualizado em {new Date(updatedAt).toLocaleDateString('pt-BR')}
        </time>
        {readTimeMinutes ? (
          <>
            <span>·</span>
            <span>{readTimeMinutes} min de leitura</span>
          </>
        ) : null}
      </div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
        {h1}
      </h1>
      <p className="text-base text-slate-700 font-medium leading-relaxed max-w-3xl">{intro}</p>
      <p className="mt-2 text-xs text-slate-500">Por {author}</p>
    </header>
  );
}
