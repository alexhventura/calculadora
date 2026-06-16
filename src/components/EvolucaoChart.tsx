import { useState, useRef, useEffect, MouseEvent } from 'react';
import { RegistroMensal } from '../types';

interface EvolucaoChartProps {
  data: RegistroMensal[];
}

export default function EvolucaoChart({ data }: EvolucaoChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 320 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeLegend, setActiveLegend] = useState<'all' | 'user' | 'poupanca' | 'cdi'>('all');

  // Watch size changes using ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;
    
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      setDimensions({ 
        width: Math.max(width, 280), 
        height: Math.max(height, 280) 
      });
    });

    const targetEl = containerRef.current;
    resizeObserver.observe(targetEl);
    return () => {
      resizeObserver.unobserve(targetEl);
    };
  }, []);

  if (data.length === 0) return null;

  const { width, height } = dimensions;
  const paddingLeft = 65;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Encontrar o maior valor global para definir escala Y
  const maxVal = Math.max(
    ...data.map((d) => Math.max(d.saldoUser || 0, d.saldoPoupanca || 0, d.saldoCDI || 0, d.saldoSelic || 0))
  );
  
  // Margem de respiro no topo de 10%. Se o valor for inválido ou zero, assume valor padrão de 1000.
  const yMax = isNaN(maxVal) || maxVal <= 0 ? 1000 : maxVal * 1.1;
  const yMin = 0; // Escala começa do zero para dar proporção real

  // Funções de conversão para coordenadas pixel
  const getX = (index: number) => {
    if (data.length <= 1) return paddingLeft;
    return paddingLeft + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (val: number) => {
    const valClean = isNaN(val) ? 0 : val;
    const diff = yMax - yMin;
    const scale = diff > 0 ? chartHeight / diff : 0;
    return paddingTop + chartHeight - (valClean - yMin) * scale;
  };

  // Gerar caminho SVG para as diferentes linhas
  const generatePath = (getValue: (d: RegistroMensal) => number) => {
    if (data.length === 0) return '';
    return data
      .map((d, i) => {
        const x = getX(i);
        const y = getY(getValue(d));
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  };

  // Caminho das 4 variáveis (Simulado, Poupança, CDI, Valor Investido)
  const pathUser = generatePath((d) => d.saldoUser);
  const pathPoupanca = generatePath((d) => d.saldoPoupanca);
  const pathCDI = generatePath((d) => d.saldoCDI);
  const pathInvestido = generatePath((d) => d.totalInvestido);

  // Manipular movimento de mouse para crosshair e tooltip
  const handleMouseMove = (e: MouseEvent<SVGSVGElement>) => {
    if (!containerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - paddingLeft;
    const relativeX = mouseX / chartWidth;
    
    if (relativeX < 0 || relativeX > 1) {
      setHoveredIndex(null);
      return;
    }

    const index = Math.round(relativeX * (data.length - 1));
    if (index >= 0 && index < data.length) {
      setHoveredIndex(index);
    } else {
      setHoveredIndex(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // Geração de Gridlines Y
  const gridTicksY = 5;
  const yTicksValues = Array.from({ length: gridTicksY }, (_, i) => {
    return yMin + (i * (yMax - yMin)) / (gridTicksY - 1);
  });

  // Geração de Gridlines X
  const totalItems = data.length;
  // Limitar marcadores no eixo X para caber bem na tela
  const maxXTicks = width < 500 ? 4 : 6;
  const stepX = Math.max(1, Math.ceil(totalItems / maxXTicks));
  const xIndices: number[] = [];
  for (let i = 0; i < totalItems; i += stepX) {
    xIndices.push(i);
  }
  // Garantir que o último item sempre seja exibido
  if (xIndices[xIndices.length - 1] !== totalItems - 1) {
    xIndices.push(totalItems - 1);
  }

  const formatCurrency = (val: number) => {
    if (val >= 1000000) {
      return `R$ ${(val / 1000000).toFixed(1)}M`;
    }
    if (val >= 1000) {
      return `R$ ${(val / 1000).toFixed(0)}k`;
    }
    return `R$ ${val.toFixed(0)}`;
  };

  const hoveredData = hoveredIndex !== null ? data[hoveredIndex] : null;

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 shadow-xs select-none relative overflow-hidden min-w-0 chart-skeleton" role="region" aria-label="Gráfico de evolução patrimonial">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-semibold text-slate-900 text-lg">Evolução Patrimonial</h3>
          <p className="text-xs text-slate-400">Comparação interativa do crescimento ao longo do tempo</p>
        </div>

        {/* Legendas Interativas */}
        <div className="flex flex-wrap gap-2 text-xs">
          <button 
            type="button"
            onClick={() => setActiveLegend('all')}
            className={`px-2.5 py-2 sm:py-1 rounded-full border transition-all pointer-events-auto cursor-pointer min-h-[2.25rem] sm:min-h-0 ${
              activeLegend === 'all' 
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Ver Tudo
          </button>
          <button 
            type="button"
            onClick={() => setActiveLegend('user')}
            className={`px-2.5 py-2 sm:py-1 rounded-full border transition-all pointer-events-auto cursor-pointer min-h-[2.25rem] sm:min-h-0 ${
              activeLegend === 'user' 
                ? 'bg-[#800020] text-white border-[#800020] shadow-sm' 
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-white mr-1 border border-red-200"></span>
            Simulado (Bordô)
          </button>
          <button 
            type="button"
            onClick={() => setActiveLegend('cdi')}
            className={`px-2.5 py-2 sm:py-1 rounded-full border transition-all pointer-events-auto cursor-pointer min-h-[2.25rem] sm:min-h-0 ${
              activeLegend === 'cdi' 
                ? 'bg-slate-800 text-white border-slate-800 shadow-sm' 
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="inline-block w-2.5 h-2.5 rounded-xs border-t-2 border-dashed border-slate-800 mr-1"></span>
            Taxa Selic/CDI
          </button>
          <button 
            type="button"
            onClick={() => setActiveLegend('poupanca')}
            className={`px-2.5 py-2 sm:py-1 rounded-full border transition-all pointer-events-auto cursor-pointer min-h-[2.25rem] sm:min-h-0 ${
              activeLegend === 'poupanca' 
                ? 'bg-slate-400 text-white border-slate-400 shadow-sm' 
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-400 mr-1"></span>
            Poupança (Simulado)
          </button>
        </div>
      </div>

      {/* Container do Gráfico SVG */}
      <div ref={containerRef} className="w-full flex-1 min-h-[220px] max-h-[400px] relative overflow-hidden min-w-0 chart-skeleton">
        <svg
          width="100%"
          height="100%"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="overflow-visible select-none"
          role="img"
          aria-label="Gráfico comparativo de saldo simulado, poupança e CDI ao longo do tempo"
        >
          {/* Gridlines horizontais (Eixo Y) */}
          {yTicksValues.map((val, i) => {
            const y = getY(val);
            return (
              <g key={`y-grid-${i}`}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="font-mono text-[10px] fill-slate-400 font-medium"
                >
                  {formatCurrency(val)}
                </text>
              </g>
            );
          })}

          {/* Gridlines verticais (Eixo X) */}
          {xIndices.map((idx, i) => {
            const x = getX(idx);
            const label = data[idx].label;
            return (
              <g key={`x-grid-${i}`}>
                <line
                  x1={x}
                  y1={paddingTop}
                  x2={x}
                  y2={paddingTop + chartHeight}
                  stroke="#f8fafc"
                  strokeWidth="1.5"
                />
                <text
                  x={x}
                  y={paddingTop + chartHeight + 18}
                  textAnchor="middle"
                  className="font-sans text-[10px] fill-slate-400"
                >
                  {label}
                </text>
              </g>
            );
          })}

          {/* Linha do Valor Principal Investido (base cinza bem claro) */}
          <path
            d={pathInvestido}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="2"
            strokeLinecap="round"
            className="transition-all duration-300"
          />

          {/* Linha da Poupança (Cinza Médio Sólido) */}
          {(activeLegend === 'all' || activeLegend === 'poupanca') && (
            <path
              d={pathPoupanca}
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          )}

          {/* Linha do CDI (Preta Tracejada) */}
          {(activeLegend === 'all' || activeLegend === 'cdi') && (
            <path
              d={pathCDI}
              fill="none"
              stroke="#1e293b"
              strokeWidth="2.5"
              strokeDasharray="4 4"
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          )}

          {/* Linha Simulado do Usuário (Bordô Sólido) */}
          {(activeLegend === 'all' || activeLegend === 'user') && (
            <path
              d={pathUser}
              fill="none"
              stroke="#800020"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          )}

          {/* Eixo principal (linha do fundo) */}
          <line
            x1={paddingLeft}
            y1={paddingTop + chartHeight}
            x2={width - paddingRight}
            y2={paddingTop + chartHeight}
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />

          {/* Linha de mira vertical / Crosshair se houver Hover */}
          {hoveredIndex !== null && (
            <g>
              <line
                x1={getX(hoveredIndex)}
                y1={paddingTop}
                x2={getX(hoveredIndex)}
                y2={paddingTop + chartHeight}
                stroke="#800020"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.8"
              />
              {/* Pontinhos ativos nas linhas */}
              <circle
                cx={getX(hoveredIndex)}
                cy={getY(data[hoveredIndex].totalInvestido)}
                r="3.5"
                fill="#cbd5e1"
                stroke="#fff"
                strokeWidth="1.5"
              />
              {(activeLegend === 'all' || activeLegend === 'poupanca') && (
                <circle
                  cx={getX(hoveredIndex)}
                  cy={getY(data[hoveredIndex].saldoPoupanca)}
                  r="4"
                  fill="#94a3b8"
                  stroke="#fff"
                  strokeWidth="1.5"
                />
              )}
              {(activeLegend === 'all' || activeLegend === 'cdi') && (
                <circle
                  cx={getX(hoveredIndex)}
                  cy={getY(data[hoveredIndex].saldoCDI)}
                  r="4"
                  fill="#1e293b"
                  stroke="#fff"
                  strokeWidth="1.5"
                />
              )}
              {(activeLegend === 'all' || activeLegend === 'user') && (
                <circle
                  cx={getX(hoveredIndex)}
                  cy={getY(data[hoveredIndex].saldoUser)}
                  r="5.5"
                  fill="#800020"
                  stroke="#fff"
                  strokeWidth="2"
                  className="shadow-sm"
                />
              )}
            </g>
          )}
        </svg>

        {/* Card do Tooltip Flutuante estilo Fintech */}
        {hoveredData && (
          <div
            className="absolute z-30 pointer-events-none bg-white/95 backdrop-blur-xs border border-slate-100 rounded-xl shadow-xl p-3 text-xs w-[190px] max-w-[calc(100%-1.5rem)]"
            style={{
              left: `${Math.min(
                Math.max(getX(hoveredIndex!) - 95, 10),
                width - 200
              )}px`,
              top: `${Math.max(
                Math.min(getY(hoveredData.saldoUser) - 145, height - 190),
                5
              )}px`,
            }}
          >
            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1 mb-2 flex justify-between">
              <span>{hoveredData.label}</span>
              <span className="font-mono font-normal text-slate-400">({hoveredData.tempoExibicao})</span>
            </div>
            
            <div className="space-y-1.5 font-mono">
              <div className="flex justify-between items-center text-slate-500">
                <span className="flex items-center gap-1 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                  Investido:
                </span>
                <span className="font-semibold text-slate-700">
                  {hoveredData.totalInvestido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-rose-950 font-bold">
                <span className="flex items-center gap-1 text-[#800020] font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#800020]"></span>
                  Simulado:
                </span>
                <span>
                  {hoveredData.saldoUser.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-800">
                <span className="flex items-center gap-1 text-slate-800 font-sans">
                  <span className="w-1.5 h-1.5 rounded-xs border-t border-dashed border-slate-800"></span>
                  Evol. CDI:
                </span>
                <span className="font-semibold">
                  {hoveredData.saldoCDI.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-500">
                <span className="flex items-center gap-1 text-slate-500 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  Poupança:
                </span>
                <span className="font-semibold">
                  {hoveredData.saldoPoupanca.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Roda do rodapé do gráfico com explicações Rápidas */}
      <div className="border-t border-slate-50 mt-4 pt-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <div className="text-[10px] text-slate-400 max-w-md">
          * Arraste o cursor sobre as linhas para inspecionar e comparar os valores em qualquer mês da evolução patrimonial simulada.
        </div>
        <div className="flex items-center gap-2.5 text-[11px] font-mono font-medium text-slate-600">
          <div className="flex items-center gap-1">
            <span className="w-2 h-0.5 bg-[#800020] inline-block"></span>
            <span>Simulado</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-0.5 border-t border-dashed border-slate-700 inline-block"></span>
            <span>CDI</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-0.5 bg-slate-300 inline-block"></span>
            <span>Poupança</span>
          </div>
        </div>
      </div>
    </div>
  );
}
