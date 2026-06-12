import type { Request, Response } from 'express';
import prisma from '../config/database';

export const listarMaderas = async (req: Request, res: Response): Promise<void> => {
  try {
    const maderas = await prisma.madera.findMany();
    res.status(200).json(maderas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el catálogo de maderas.' });
  }
};