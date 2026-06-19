import type { Request, Response } from 'express';
import prisma from '../config/database';
import { calcularPresupuestoEstimado } from '../utils/calculatePrice';

interface CrearPresupuestoBody {
  cliente_nombre: string;
  contacto: string;
  tipo_mueble: string;
  medidas: {
    alto: number;
    ancho: number;
    profundidad: number;
  };
  madera_id: number;
  herraje_id: number;
  acabado_id: number;
  canal_ingreso: string;
}

export const crearPresupuesto = async (req: Request<{}, {}, CrearPresupuestoBody>, res: Response): Promise<void> => {
  try {
    const {
      cliente_nombre,
      contacto,
      tipo_mueble,
      medidas,
      madera_id,
      herraje_id,
      acabado_id,
      canal_ingreso
    } = req.body;

    if (!medidas || typeof medidas !== 'object') {
      res.status(400).json({ error: 'El campo medidas debe ser un objeto válido.' });
      return;
    }

    const altoNum = Number(medidas.alto);
    const anchoNum = Number(medidas.ancho);
    const profundidadNum = Number(medidas.profundidad);

    if (
      isNaN(altoNum) || altoNum <= 0 ||
      isNaN(anchoNum) || anchoNum <= 0 ||
      isNaN(profundidadNum) || profundidadNum <= 0
    ) {
      res.status(400).json({ error: 'Las medidas (alto, ancho, profundidad) deben ser números válidos y mayores a 0.' });
      return;
    }

    if (!madera_id || !herraje_id || !acabado_id) {
      res.status(400).json({ error: 'Los campos madera_id, herraje_id y acabado_id son obligatorios para el cálculo.' });
      return;
    }

    // Consulta de costos reales en base de datos usando la instancia global
    const madera = await prisma.madera.findUnique({ where: { id: Number(madera_id) } });
    const herraje = await prisma.herraje.findUnique({ where: { id: Number(herraje_id) } });
    const acabado = await prisma.acabado.findUnique({ where: { id: Number(acabado_id) } });

    if (!madera || !herraje || !acabado) {
      res.status(404).json({ error: 'Madera, Herraje o Acabado no encontrados en la base de datos.' });
      return;
    }

    // Definición del margen de ganancia fijo por el negocio (30%)
    const MARGEN_GANANCIA = 1.30;

    // Motor de cálculo estricto
    const { precioMinimo, precioMaximo } = calcularPresupuestoEstimado({
      medidas: { alto: altoNum, ancho: anchoNum, profundidad: profundidadNum },
      costo_material_m2: Number(madera.precio_m2),
      costo_herrajes: Number(herraje.precio_unidad),
      costo_acabado: Number(acabado.precio_extra),
      margen_ganancia: MARGEN_GANANCIA
    });

    const nuevoPresupuesto = await prisma.presupuesto.create({
      data: {
        cliente_nombre,
        contacto,
        tipo_mueble,
        medidas: {
          alto: altoNum,
          ancho: anchoNum,
          profundidad: profundidadNum
        },
        total_estimado: precioMinimo,
        canal_ingreso
      }
    });

    // Formateador para retrocompatibilidad con el frontend
    const formateador = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    });

    res.status(201).json({
      success: true,
      id: nuevoPresupuesto.id,
      rango_estimado: `${formateador.format(precioMinimo)} - ${formateador.format(precioMaximo)}`,
      message: "Presupuesto calculado y creado con éxito"
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno al crear el presupuesto.' });
  }
};
