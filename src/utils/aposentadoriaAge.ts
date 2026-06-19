export function isAposentadoriaIdadeInvalida(idadeAtual: number, idadeAlvo: number): boolean {
  return idadeAtual > 0 && idadeAlvo > 0 && idadeAlvo <= idadeAtual;
}

export function aposentadoriaAnosRestantes(idadeAtual: number, idadeAlvo: number): number | null {
  if (idadeAtual <= 0 || idadeAlvo <= 0) return null;
  if (idadeAlvo <= idadeAtual) return null;
  return idadeAlvo - idadeAtual;
}

export const APOSENTADORIA_IDADE_INVALIDA_MSG =
  'A idade de aposentadoria deve ser maior que a idade atual.';
