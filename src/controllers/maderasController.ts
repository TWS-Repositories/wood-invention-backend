import type { Request, Response } from 'express';
import prisma from '../config/database';

export const listarMaderas = async (req: Request, res: Response): Promise<void> => {
  try {
    const maderas = await prisma.madera.findMany({
      select: {
        id: true,
        nombre: true,
        imagen_url: true,
        precio_m2: true,
      }
    });
    res.status(200).json(maderas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el catálogo de maderas.' });
  }
};