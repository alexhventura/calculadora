/** Deriva meses trabalhados e dias no último mês a partir de datas. */
export function calcularPeriodoRescisao(
  dataAdmissao: string,
  dataDesligamento: string,
): { mesesTrabalhados: number; diasUltimoMes: number } {
  const adm = parseDate(dataAdmissao);
  const des = parseDate(dataDesligamento);
  if (!adm || !des || des < adm) {
    return { mesesTrabalhados: 1, diasUltimoMes: 30 };
  }

  let meses =
    (des.getFullYear() - adm.getFullYear()) * 12 + (des.getMonth() - adm.getMonth());
  if (des.getDate() < adm.getDate()) meses -= 1;
  meses = Math.max(1, meses);

  const diasUltimoMes = Math.min(30, Math.max(1, des.getDate()));

  return { mesesTrabalhados: meses, diasUltimoMes };
}

function parseDate(iso: string): Date | null {
  if (!iso) return null;
  const d = new Date(iso + 'T12:00:00');
  return Number.isNaN(d.getTime()) ? null : d;
}
