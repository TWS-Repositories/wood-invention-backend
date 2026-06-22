import prisma from '../config/database';

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
}

/**
 * Motor de cálculo para el presupuesto estimado.
 *
 * Fórmula Exacta: ((M2 * Costo_Madera) + Costo_Herrajes + Costo_Acabado) * Margen_Ganancia
 *
 * @param {CalculationParams} params - Objeto con las dimensiones y costos.
 * @returns {Promise<object>} Objeto con precioMinimo y precioMaximo para el rango estimado.
 */
export const calcularPresupuestoEstimado = async (params: CalculationParams): Promise<{ precioMinimo: number; precioMaximo: number }> => {
  const { medidas, costo_material_m2, costo_herrajes, costo_acabado } = params;

  // 1. Cálculo de M2 (centímetros a metros cuadrados)
  const m2 = (medidas.alto * medidas.ancho) / 10000;

  // 2. Cálculo del costo base incluyendo todos los materiales y acabados
  const costoBase = (m2 * costo_material_m2) + costo_herrajes + costo_acabado;

  // 3. Obtención y aplicación del margen de ganancia
  const config = await prisma.configuracion.findUnique({ where: { key: "margen_ganancia" } });
  const margen_ganancia = config ? config.value : 1.30;

  const totalEstimado = costoBase * margen_ganancia;

  // 4. Cálculo del rango estimado (-5% a +10%)
  const precioMinimo = totalEstimado * 0.95;
  const precioMaximo = totalEstimado * 1.10;

  return {
    precioMinimo: Math.round(precioMinimo),
    precioMaximo: Math.round(precioMaximo)
  };
};
