import type { CSSProperties } from 'react';
import { formatBRL } from '../../utils/format';
import {
  getCurrencyAmountMetrics,
  type CurrencyAmountVariant,
} from '../../utils/currencyDisplay';

type CurrencyTag = 'span' | 'h3' | 'div';

interface CurrencyAmountProps {
  value: number;
  variant?: CurrencyAmountVariant;
  className?: string;
  as?: CurrencyTag;
  prefix?: string;
}

export default function CurrencyAmount({
  value,
  variant = 'card',
  className = '',
  as: Tag = 'span',
  prefix = '',
}: CurrencyAmountProps) {
  const { cssVars } = getCurrencyAmountMetrics(value, variant);

  return (
    <Tag
      data-currency-amount
      data-variant={variant}
      data-currency-len={cssVars['--currency-len']}
      style={cssVars as CSSProperties}
      className={`currency-amount-fluid font-mono font-extrabold tracking-tight whitespace-nowrap tabular-nums max-w-full min-w-0 block ${className}`}
    >
      {prefix}
      {formatBRL(value)}
    </Tag>
  );
}
