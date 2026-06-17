import { useEffect, useRef } from 'react';
import {
  getAdSlot,
  isAdSlotActive,
  MONETIZATION_CONFIG,
  type AdSlotFormat,
  type AdSlotKey,
} from '../../constants/monetization';

const sizeMap: Record<
  AdSlotFormat,
  { containerClass: string; minHeight: number; adsenseFormat?: string }
> = {
  '728x90': {
    containerClass: 'min-h-[90px] max-w-[728px] w-full',
    minHeight: 90,
    adsenseFormat: 'horizontal',
  },
  '300x250': {
    containerClass: 'min-h-[250px] max-w-[300px] w-full',
    minHeight: 250,
    adsenseFormat: 'rectangle',
  },
  '300x600': {
    containerClass: 'min-h-[400px] max-w-[300px] w-full md:min-h-[600px]',
    minHeight: 600,
    adsenseFormat: 'vertical',
  },
  'horizontal-flexible': {
    containerClass: 'min-h-[90px] w-full',
    minHeight: 90,
    adsenseFormat: 'auto',
  },
};

interface AdSlotRendererProps {
  slotKey: AdSlotKey;
  className?: string;
}

function AdSlotRendererActive({ slotKey, className = '' }: AdSlotRendererProps) {
  const insRef = useRef<HTMLModElement>(null);
  const slot = getAdSlot(slotKey);
  const { containerClass, minHeight, adsenseFormat } = sizeMap[slot.format];
  const { provider, adsenseClientId } = MONETIZATION_CONFIG;

  useEffect(() => {
    if (provider !== 'adsense' || !insRef.current) return;

    try {
      const w = window as Window & { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle ?? [];
      w.adsbygoogle.push({});
    } catch {
      /* script do AdSense ainda não carregado */
    }
  }, [provider, slotKey]);

  return (
    <aside
      className={`mx-auto ${containerClass} ${className}`.trim()}
      role="complementary"
      aria-label={slot.label}
      data-ad-slot-key={slotKey}
      data-ad-provider={provider}
      data-ad-format={slot.format}
      style={{ minHeight }}
    >
      {provider === 'adsense' && (
        <ins
          ref={insRef}
          className="adsbygoogle block w-full"
          style={{ display: 'block' }}
          data-ad-client={adsenseClientId}
          data-ad-slot={slot.slotId}
          data-ad-format={adsenseFormat}
          data-full-width-responsive={slot.format === 'horizontal-flexible' ? 'true' : undefined}
        />
      )}

      {provider !== 'adsense' && (
        <div
          className="w-full h-full"
          data-affiliate-slot={slot.slotId}
          data-affiliate-provider={provider}
        />
      )}
    </aside>
  );
}

/**
 * Motor de renderização de anúncios.
 * Retorna null quando monetização está desativada — zero impacto no layout.
 */
export default function AdSlotRenderer({ slotKey, className = '' }: AdSlotRendererProps) {
  if (!isAdSlotActive(slotKey)) {
    return null;
  }

  return <AdSlotRendererActive slotKey={slotKey} className={className} />;
}
