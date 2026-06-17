import { isAdSlotActive } from '../../constants/monetization';
import AdSlotRenderer from './AdSlotRenderer';

interface AdSlotSidebarProps {
  className?: string;
}

/** Retângulo médio na coluna lateral — desktop/tablet */
export default function AdSlotSidebar({ className = '' }: AdSlotSidebarProps) {
  if (!isAdSlotActive('sidebar')) return null;

  return (
    <div className="order-4 lg:col-span-1 lg:col-start-1 lg:row-start-3 h-fit flex justify-center">
      <AdSlotRenderer slotKey="sidebar" className={className} />
    </div>
  );
}
