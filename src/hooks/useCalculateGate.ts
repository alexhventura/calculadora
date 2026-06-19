import { useCallback, useEffect, useState } from 'react';
import type { ToolCalculationInput } from '../utils/calculations/toolCalculations';

export function useCalculateGate(activeTool: string) {
  const [calcSnapshot, setCalcSnapshot] = useState<ToolCalculationInput | null>(null);
  const [calcVersion, setCalcVersion] = useState(0);

  const calculate = useCallback((input: ToolCalculationInput) => {
    setCalcSnapshot(input);
    setCalcVersion((v) => v + 1);
  }, []);

  const reset = useCallback(() => {
    setCalcSnapshot(null);
    setCalcVersion(0);
  }, []);

  useEffect(() => {
    reset();
  }, [activeTool, reset]);

  return {
    calcSnapshot,
    calcVersion,
    calculate,
    reset,
    hasCalculated: calcSnapshot !== null,
  } as const;
}
