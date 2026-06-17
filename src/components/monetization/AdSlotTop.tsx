import { isAdSlotActive } from '../../constants/monetization';
import AdSlotRenderer from './AdSlotRenderer';

/** Banner leaderboard superior — abaixo do header */
export default function AdSlotTop() {
  if (!isAdSlotActive('top')) return null;

  return (
    <section
      className="py-4 px-4 bg-slate-100/50 border-b border-slate-100 flex justify-center"
      aria-label="Publicidade"
    >
      <AdSlotRenderer slotKey="top" />
    </section>
  );
}
