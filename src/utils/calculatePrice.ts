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

export interface CalculationResult {
  exacto: number;
  minimo: number;
  maximo: number;
  rango_estimado: string;
}

/**
 * Motor de cálculo para el presupuesto estimado.
 * 
 * Paso a paso de la fórmula:
 * 1. Calcula los metros cuadrados (M2): toma el alto y ancho (en cm) y los multiplica, dividiendo el total entre 10,000.
 * 2. Calcula el costo base del material: multiplica los M2 resultantes por el costo_material_m2.
 * 3. Suma el costo de los herrajes y acabados al total base.
 * 4. Calcula el margen para obtener un rango estimado:
 *    - Mínimo: 10% menos del valor exacto (precio * 0.90).
 *    - Máximo: 15% más del valor exacto (precio * 1.15).
 * 5. Genera un string formateado como moneda local para el rango.
 * 
 * @param {CalculationParams} params - Objeto con las dimensiones y costos asociados.
 * @returns {CalculationResult} Objeto que contiene el valor exacto para base de datos y los rangos para el frontend.
 */
export const calcularPresupuestoEstimado = (params: CalculationParams): CalculationResult => {
  const { medidas, costo_material_m2, costo_herrajes, costo_acabado } = params;

  // 1. Cálculo de M2 (centímetros a metros cuadrados)
  const m2 = (medidas.alto * medidas.ancho) / 10000;

  // 2 y 3. Fórmula principal de costo base exacto
  const precioExacto = (m2 * costo_material_m2) + costo_herrajes + costo_acabado;

  // 4. Aplicación de márgenes
  const precioMinimo = precioExacto * 0.90;
  const precioMaximo = precioExacto * 1.15;

  // 5. Formateador de moneda (ARS por defecto, sin decimales para simplificar lectura)
  const formateador = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  });

  return {
    exacto: Math.round(precioExacto),
    minimo: Math.round(precioMinimo),
    maximo: Math.round(precioMaximo),
    rango_estimado: `${formateador.format(precioMinimo)} - ${formateador.format(precioMaximo)}`
  };
};
