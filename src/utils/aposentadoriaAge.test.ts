import { describe, expect, it } from 'vitest';
import {
  aposentadoriaAnosRestantes,
  isAposentadoriaIdadeInvalida,
} from './aposentadoriaAge';

describe('isAposentadoriaIdadeInvalida', () => {
  it('aceita combinações válidas', () => {
    expect(isAposentadoriaIdadeInvalida(35, 60)).toBe(false);
    expect(isAposentadoriaIdadeInvalida(40, 65)).toBe(false);
    expect(isAposentadoriaIdadeInvalida(25, 55)).toBe(false);
  });

  it('rejeita idade de aposentadoria menor ou igual à idade atual', () => {
    expect(isAposentadoriaIdadeInvalida(60, 50)).toBe(true);
    expect(isAposentadoriaIdadeInvalida(40, 35)).toBe(true);
    expect(isAposentadoriaIdadeInvalida(55, 54)).toBe(true);
    expect(isAposentadoriaIdadeInvalida(40, 40)).toBe(true);
  });

  it('não valida enquanto campos estão vazios', () => {
    expect(isAposentadoriaIdadeInvalida(0, 60)).toBe(false);
    expect(isAposentadoriaIdadeInvalida(35, 0)).toBe(false);
    expect(isAposentadoriaIdadeInvalida(0, 0)).toBe(false);
  });
});

describe('aposentadoriaAnosRestantes', () => {
  it('calcula horizonte quando válido', () => {
    expect(aposentadoriaAnosRestantes(35, 60)).toBe(25);
    expect(aposentadoriaAnosRestantes(40, 65)).toBe(25);
    expect(aposentadoriaAnosRestantes(25, 55)).toBe(30);
  });

  it('retorna null quando inválido ou incompleto', () => {
    expect(aposentadoriaAnosRestantes(60, 50)).toBeNull();
    expect(aposentadoriaAnosRestantes(40, 35)).toBeNull();
    expect(aposentadoriaAnosRestantes(55, 54)).toBeNull();
    expect(aposentadoriaAnosRestantes(0, 60)).toBeNull();
    expect(aposentadoriaAnosRestantes(35, 0)).toBeNull();
  });
});
