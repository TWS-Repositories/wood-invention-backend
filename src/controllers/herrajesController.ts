import type { Request, Response } from 'express';
import prisma from '../config/database';

export const listarHerrajes = async (req: Request, res: Response): Promise<void> => {
  try {
    const herrajes = await prisma.herraje.findMany();
    res.status(200).json(herrajes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el catálogo de herrajes.' });
  }
};