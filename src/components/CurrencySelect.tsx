import { useState, useRef, useEffect, useMemo } from 'react';
import type { CurrencyInfo } from '../constants/currencies';

interface CurrencySelectProps {
  value: string;
  onChange: (code: string) => void;
  currencies: CurrencyInfo[];
  id: string;
  label: string;
}

export default function CurrencySelect({ value, onChange, currencies, id, label }: CurrencySelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = currencies.find((c) => c.code === value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return currencies;
    return currencies.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q),
    );
  }, [currencies, query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <div className="relative flex-1 group" ref={containerRef}>
      <button
        type="button"
        id={id}
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-2.5 py-2 bg-slate-50 border border-slate-200 group-hover:border-amber-500 text-slate-700 text-[11px] font-bold rounded-xl transition-all min-h-[2.75rem] sm:min-h-8 sm:h-8"
      >
        <span>{value}</span>
        <span className="text-[8px] text-slate-400">▼</span>
      </button>

      {open && (
        <div
          className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden min-w-[10rem] max-h-[min(16rem,50vh)]"
          role="listbox"
          aria-label={`${label} — opções`}
        >
          <div className="p-1.5 border-b border-slate-100">
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar moeda..."
              className="w-full px-2 py-2 text-[11px] bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-amber-500 min-h-[2.75rem] sm:min-h-0"
              aria-label="Buscar moeda por nome ou código"
            />
          </div>
          <ul className="max-h-48 overflow-y-auto overscroll-contain">
            {filtered.length === 0 ? (
              <li className="px-2.5 py-2 text-[10px] text-slate-400 text-center">Nenhuma moeda encontrada</li>
            ) : (
              filtered.map((c) => (
                <li key={c.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={c.code === value}
                    onClick={() => {
                      onChange(c.code);
                      setOpen(false);
                      setQuery('');
                    }}
                    className={`w-full text-left px-2.5 py-2.5 sm:py-1.5 text-[11px] hover:bg-amber-50 transition-colors min-h-[2.75rem] sm:min-h-0 ${
                      c.code === value ? 'bg-amber-50/60 font-bold text-amber-800' : 'text-slate-700'
                    }`}
                  >
                    <span className="font-bold">{c.code}</span>
                    <span className="text-slate-400 ml-1">— {c.name}</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {/* Mantém nome acessível para leitores de tela */}
      <span className="sr-only">{selected ? `${selected.code} — ${selected.name}` : value}</span>
    </div>
  );
}
