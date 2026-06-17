import type { Request, Response } from 'express';
import prisma from '../config/database';

interface CrearPresupuestoBody {
  clienteNombre: string;
  clienteTelefono: string;
  tipoMueble: string;
  alto: number;
  ancho: number;
  profundidad: number;
  material: string;
  acabado: string;
  herrajes: string;
  precio?: number;
  estado?: string;
  source: string; // This maps to canal_ingreso
}

export const crearPresupuesto = async (req: Request<{}, {}, CrearPresupuestoBody>, res: Response): Promise<void> => {
  try {
    const {
      clienteNombre,
      clienteTelefono,
      tipoMueble,
      alto,
      ancho,
      profundidad,
      material,
      acabado,
      herrajes,
      precio,
      estado,
      source
    } = req.body;

    // Validación estricta de medidas
    const altoNum = Number(alto);
    const anchoNum = Number(ancho);
    const profundidadNum = Number(profundidad);

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
        clienteNombre,
        clienteTelefono,
        tipoMueble,
        alto: altoNum,
        ancho: anchoNum,
        profundidad: profundidadNum,
        material,
        acabado,
        herrajes,
        precio: precio !== undefined ? Number(precio) : 0,
        estado: estado ?? "Pendiente",
        canal_ingreso: source
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
