import { useCallback, useEffect, useState } from 'react';
import type { CalculatorMode } from '../types/calculator';

const STORAGE_PREFIX = 'calc-mode-';

export function useCalculatorMode(toolId: string, defaultMode: CalculatorMode = 'simple') {
  const storageKey = `${STORAGE_PREFIX}${toolId}`;

  const [mode, setModeState] = useState<CalculatorMode>(() => {
    if (typeof window === 'undefined') return defaultMode;
    const stored = localStorage.getItem(storageKey);
    return stored === 'advanced' ? 'advanced' : defaultMode;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, mode);
  }, [mode, storageKey]);

  const setMode = useCallback((next: CalculatorMode) => {
    setModeState(next);
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((prev) => (prev === 'simple' ? 'advanced' : 'simple'));
  }, []);

  return { mode, setMode, toggleMode, isAdvanced: mode === 'advanced' } as const;
}
