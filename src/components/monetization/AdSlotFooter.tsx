import { isAdSlotActive } from '../../constants/monetization';
import AdSlotRenderer from './AdSlotRenderer';

/** Banner leaderboard inferior — acima do rodapé */
export default function AdSlotFooter() {
  if (!isAdSlotActive('footer')) return null;

  return (
    <section
      className="py-6 px-4 bg-slate-100/50 border-t border-slate-100 flex justify-center"
      aria-label="Publicidade"
    >
      <AdSlotRenderer slotKey="footer" />
    </section>
  );
}
