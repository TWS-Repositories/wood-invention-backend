import type { Request, Response } from 'express';
import prisma from '../config/database';

interface CrearPresupuestoBody {
  cliente_nombre: string;
  contacto: string;
  tipo_mueble: string;
  medidas: {
    alto: number;
    ancho: number;
    profundidad: number;
  };
  precio?: number;
  estado?: string;
  canal_ingreso: string;
}

export const crearPresupuesto = async (req: Request<{}, {}, CrearPresupuestoBody>, res: Response): Promise<void> => {
  try {
    const {
      cliente_nombre,
      contacto,
      tipo_mueble,
      medidas,
      precio,
      estado,
      canal_ingreso
    } = req.body;

    if (!medidas || typeof medidas !== 'object') {
      res.status(400).json({ error: 'El campo medidas debe ser un objeto válido.' });
      return;
    }

    // Validación estricta de medidas extrayendo desde el JSON
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
        precio: precio !== undefined ? Number(precio) : 0,
        estado: estado ?? "Pendiente",
        canal_ingreso
      }
    });

    res.status(201).json({
      success: true,
      id: nuevoPresupuesto.id,
      message: "Presupuesto creado con éxito"
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error al crear presupuesto:', error);
    }
    res.status(500).json({ error: 'Error interno al crear el presupuesto.' });
  }
};
