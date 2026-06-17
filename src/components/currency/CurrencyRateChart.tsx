import { useRef, useEffect, useState } from 'react';
import type { DailyRatePoint } from '../../utils/currency/currencyHistory';

interface CurrencyRateChartProps {
  data: DailyRatePoint[];
  code: string;
  loading?: boolean;
}

export default function CurrencyRateChart({ data, code, loading }: CurrencyRateChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(600);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      if (entries[0]) setWidth(Math.max(entries[0].contentRect.width, 280));
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const height = 220;
  const padL = 56;
  const padR = 16;
  const padT = 16;
  const padB = 32;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  if (loading) {
    return (
      <div
        ref={containerRef}
        className="w-full min-h-[220px] bg-slate-50 rounded-xl border border-slate-100 animate-pulse"
        aria-hidden="true"
      />
    );
  }

  if (data.length < 2) {
    return (
      <div
        ref={containerRef}
        className="w-full min-h-[120px] flex items-center justify-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-100"
      >
        Histórico indisponível para {code}.
      </div>
    );
  }

  const values = data.map((d) => d.bid);
  const yMin = Math.min(...values) * 0.998;
  const yMax = Math.max(...values) * 1.002;
  const yRange = yMax - yMin || 1;

  const getX = (i: number) => padL + (i / (data.length - 1)) * chartW;
  const getY = (v: number) => padT + chartH - ((v - yMin) / yRange) * chartH;

  const path = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getY(d.bid).toFixed(1)}`)
    .join(' ');

  const areaPath = `${path} L ${getX(data.length - 1).toFixed(1)} ${(padT + chartH).toFixed(1)} L ${padL} ${(padT + chartH).toFixed(1)} Z`;

  const yTicks = [yMin, yMin + yRange / 2, yMax];
  const xLabels = [
    { i: 0, label: formatShortDate(data[0].date) },
    { i: Math.floor(data.length / 2), label: formatShortDate(data[Math.floor(data.length / 2)].date) },
    { i: data.length - 1, label: formatShortDate(data[data.length - 1].date) },
  ];

  return (
    <div ref={containerRef} className="w-full" role="img" aria-label={`Gráfico histórico de cotação ${code}/BRL`}>
      <svg width={width} height={height} className="overflow-visible">
        {yTicks.map((v) => (
          <g key={v}>
            <line
              x1={padL}
              y1={getY(v)}
              x2={width - padR}
              y2={getY(v)}
              stroke="#e2e8f0"
              strokeWidth={1}
            />
            <text x={padL - 6} y={getY(v) + 4} textAnchor="end" className="fill-slate-400 text-[9px] font-mono">
              {v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v.toFixed(2)}
            </text>
          </g>
        ))}
        <path d={areaPath} fill="url(#currencyGrad)" opacity={0.35} />
        <path d={path} fill="none" stroke="#b45309" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="currencyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
          </linearGradient>
        </defs>
        {xLabels.map(({ i, label }) => (
          <text
            key={i}
            x={getX(i)}
            y={height - 8}
            textAnchor="middle"
            className="fill-slate-400 text-[9px] font-sans"
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}

function formatShortDate(iso: string): string {
  const [, month, day] = iso.split('-');
  return `${day}/${month}`;
}
