import { describe, it, expect } from 'vitest';
import { calcularInssProgressivo, calcularIrrfProgressivo } from './calculations/tax';
import { calculateToolResult } from './calculations/toolCalculations';
import { formatMilhar, parseMilhar } from './format';

describe('calcularInssProgressivo', () => {
  it('calcula faixa inicial corretamente', () => {
    expect(calcularInssProgressivo(1412)).toBeCloseTo(105.9, 0);
  });

  it('não retorna negativo para salário zero', () => {
    expect(calcularInssProgressivo(0)).toBe(0);
  });
});

describe('calcularIrrfProgressivo', () => {
  it('isenta faixa inicial', () => {
    expect(calcularIrrfProgressivo(2000)).toBe(0);
  });

  it('calcula faixa intermediária', () => {
    const irrf = calcularIrrfProgressivo(3000);
    expect(irrf).toBeGreaterThan(0);
  });
});

describe('formatMilhar / parseMilhar', () => {
  it('formata e faz parse round-trip', () => {
    expect(parseMilhar(formatMilhar('10000'))).toBe(10000);
  });

  it('retorna 0 para string vazia', () => {
    expect(parseMilhar('')).toBe(0);
  });
});

describe('calculateToolResult', () => {
  const baseInput = {
    activeTool: 'juros' as const,
    valorInicialNum: 1000,
    aporteMensalNum: 100,
    tempo: 5,
    tempoUnidade: 'anos' as const,
    taxaAnual: 10,
    taxaPeriodo: 'anual' as const,
    selicRate: 14.5,
    ipcaRate: 4.25,
    salarioCltNum: 8000,
    cltVrNum: 1000,
    cltSaudeNum: 650,
    cltOutrosNum: 400,
    aposentadoriaIdadeAtual: 30,
    aposentadoriaIdadeAlvo: 65,
    aposentadoriaRendaDesejadaNum: 10000,
    aposentadoriaPatrimonioAtualNum: 50000,
    rescisaoSalarioNum: 5000,
    rescisaoMesesTrabalhados: 12,
    rescisaoMotivo: 'sem_justa' as const,
    rescisaoDiasTrabalhados: 30,
  };

  it('retorna registros para juros compostos', () => {
    const result = calculateToolResult(baseInput);
    expect(result.tool).toBe('juros');
    expect(result.registros.length).toBeGreaterThan(1);
    expect(result.totais.valorBrutoUser).toBeGreaterThan(result.totais.totalInvestidoUser);
  });

  it('calcula rescisão sem justa causa com FGTS liberado', () => {
    const result = calculateToolResult({ ...baseInput, activeTool: 'rescisao' });
    expect(result.tool).toBe('rescisao');
    expect(result.fgts?.liberado).toBe(true);
    expect(result.totalGeral).toBeGreaterThan(0);
  });
});
