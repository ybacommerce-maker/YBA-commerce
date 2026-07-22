// ==========================================================
//  CALCULO DE FRETE (simples, para a demo)
//  Regra atual:
//   - Acima de R$ 80,00: GRATIS
//   - Abaixo disso: R$ 12,00 fixo
//  Depois voce pode trocar por integracao com Correios/transportadora.
// ==========================================================

export const FRETE_GRATIS_ACIMA_DE = 80;
export const FRETE_PADRAO = 12;

export function calcularFrete(subtotal: number): number {
  if (subtotal >= FRETE_GRATIS_ACIMA_DE) return 0;
  if (subtotal <= 0) return 0;
  return FRETE_PADRAO;
}
