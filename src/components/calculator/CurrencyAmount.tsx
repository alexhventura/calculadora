import { formatBRL } from '../../utils/format';
import { currencyAmountSizeClass, type CurrencyAmountVariant } from '../../utils/currencyDisplay';

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
  const sizeClass = currencyAmountSizeClass(value, variant);

  return (
    <Tag
      className={`font-mono font-extrabold tracking-tight whitespace-nowrap tabular-nums max-w-full min-w-0 ${sizeClass} ${className}`}
    >
      {prefix}
      {formatBRL(value)}
    </Tag>
  );
}
