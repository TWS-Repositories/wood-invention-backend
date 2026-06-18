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

    if (!madera_id || !herraje_id) {
      res.status(400).json({ error: 'Los campos madera_id y herraje_id son obligatorios para el cálculo.' });
      return;
    }

    // Consulta de costos en base de datos
    const madera = await prisma.madera.findUnique({ where: { id: Number(madera_id) } });
    const herraje = await prisma.herraje.findUnique({ where: { id: Number(herraje_id) } });

    if (!madera || !herraje) {
      res.status(404).json({ error: 'Madera o Herraje no encontrados en la base de datos.' });
      return;
    }

    // Motor de cálculo
    const calculo = calcularPresupuestoEstimado({
      medidas: { alto: altoNum, ancho: anchoNum, profundidad: profundidadNum },
      costo_material_m2: Number(madera.precio_m2),
      costo_herrajes: Number(herraje.precio_unidad),
      costo_acabado: 0 // Sin tabla de Acabados en esquema, no se debe mockear
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
        total_estimado: calculo.exacto,
        canal_ingreso
      }
    });

    res.status(201).json({
      success: true,
      id: nuevoPresupuesto.id,
      rango_estimado: calculo.rango_estimado,
      message: "Presupuesto calculado y creado con éxito"
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno al crear el presupuesto.' });
  }
};
