/** IR regressivo sobre ganhos de capital — renda fixa (Lei 11.033/2004). */
export function calcularIrRegressivo(diasAplicacao: number, ganhoLiquido: number): number {
  if (ganhoLiquido <= 0) return 0;
  let aliquota: number;
  if (diasAplicacao <= 180) aliquota = 0.225;
  else if (diasAplicacao <= 360) aliquota = 0.2;
  else if (diasAplicacao <= 720) aliquota = 0.175;
  else aliquota = 0.15;
  return ganhoLiquido * aliquota;
}

export function calcularIrCustom(ganhoLiquido: number, aliquotaPercent: number): number {
  if (ganhoLiquido <= 0 || aliquotaPercent <= 0) return 0;
  return ganhoLiquido * (aliquotaPercent / 100);
}
