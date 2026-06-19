import { Request, Response } from 'express';
import prisma from '../config/database';

export const getConfig = async (req: Request, res: Response): Promise<void> => {
  try {
    const config = await prisma.configuracion.findUnique({
      where: { key: 'margen_ganancia' },
    });

    if (!config) {
      // Devolver un valor por defecto si no existe
      res.json({ key: 'margen_ganancia', value: 1.30 });
      return;
    }

    res.json(config);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la configuración' });
  }
};

export const updateConfig = async (req: Request, res: Response): Promise<void> => {
  try {
    const { value } = req.body;

    if (value === undefined || typeof value !== 'number') {
      res.status(400).json({ error: 'El valor debe ser un número válido' });
      return;
    }

    const updatedConfig = await prisma.configuracion.upsert({
      where: { key: 'margen_ganancia' },
      update: { value },
      create: {
        key: 'margen_ganancia',
        value,
      },
    });

    res.json(updatedConfig);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la configuración' });
  }
};
