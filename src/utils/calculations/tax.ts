/** INSS progressivo — tabelas vigentes 2026 (estimativa). */
export function calcularInssProgressivo(base: number): number {
  const salario = Math.max(0, base);
  if (salario <= 1412.0) return salario * 0.075;
  if (salario <= 2666.68) {
    return 1412.0 * 0.075 + (salario - 1412.0) * 0.09;
  }
  if (salario <= 4000.03) {
    return (
      1412.0 * 0.075 +
      (2666.68 - 1412.0) * 0.09 +
      (salario - 2666.68) * 0.12
    );
  }
  const limiteTeto = Math.min(salario, 7786.02);
  return (
    1412.0 * 0.075 +
    (2666.68 - 1412.0) * 0.09 +
    (4000.03 - 2666.68) * 0.12 +
    (limiteTeto - 4000.03) * 0.14
  );
}

/** IRRF progressivo — tabelas vigentes 2026 (estimativa). */
export function calcularIrrfProgressivo(base: number): number {
  const baseTributavel = Math.max(0, base);
  if (baseTributavel <= 2259.2) return 0;
  if (baseTributavel <= 2826.65) return baseTributavel * 0.075 - 169.44;
  if (baseTributavel <= 3751.05) return baseTributavel * 0.15 - 381.44;
  if (baseTributavel <= 4664.68) return baseTributavel * 0.225 - 662.77;
  return baseTributavel * 0.275 - 896.0;
}
