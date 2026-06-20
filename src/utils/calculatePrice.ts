export interface Medidas {
  alto: number;
  ancho: number;
  profundidad: number;
}

export interface CalculationParams {
  medidas: Medidas;
  costo_material_m2: number;
  costo_herrajes: number;
  costo_acabado: number;
  margen_ganancia: number;
}

/**
 * Motor de cálculo para el presupuesto estimado.
 *
 * Fórmula Exacta: ((M2 * Costo_Madera) + Costo_Herrajes + Costo_Acabado) * Margen_Ganancia
 *
 * @param {CalculationParams} params - Objeto con las dimensiones, costos y el multiplicador de margen.
 * @returns {object} Objeto con precioMinimo y precioMaximo para el rango estimado.
 */
export const calcularPresupuestoEstimado = (params: CalculationParams): { precioMinimo: number; precioMaximo: number } => {
  const { medidas, costo_material_m2, costo_herrajes, costo_acabado, margen_ganancia } = params;

  // 1. Cálculo de M2 (centímetros a metros cuadrados)
  const m2 = (medidas.alto * medidas.ancho) / 10000;

  // 2. Cálculo del costo base incluyendo todos los materiales y acabados
  const costoBase = (m2 * costo_material_m2) + costo_herrajes + costo_acabado;

  // 3. Aplicación del margen de ganancia
  const totalEstimado = costoBase * margen_ganancia;

  // 4. Cálculo del rango estimado (-5% a +10%)
  const precioMinimo = totalEstimado * 0.95;
  const precioMaximo = totalEstimado * 1.10;

  return {
    precioMinimo: Math.round(precioMinimo),
    precioMaximo: Math.round(precioMaximo)
  };
};
