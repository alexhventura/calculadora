import AdSlotRenderer from './AdSlotRenderer';

interface AdSlotInlineProps {
  className?: string;
}

/** Banner responsivo entre blocos de conteúdo (resultados, gráficos, tabelas) */
export default function AdSlotInline({ className = '' }: AdSlotInlineProps) {
  return <AdSlotRenderer slotKey="inline" className={className} />;
}
