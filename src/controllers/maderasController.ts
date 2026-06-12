import type { Request, Response } from 'express';

const maderasMock = [
  { id: 1, material: 'Pino', reglaCalculo: 'M2', precioBase: 1500, estado: 'ACTIVO' },
  { id: 2, material: 'Paraíso', reglaCalculo: 'M2', precioBase: 3200, estado: 'ACTIVO' },
  { id: 3, material: 'Cedro', reglaCalculo: 'M2', precioBase: 4500, estado: 'INACTIVO' }
];

export const listarMaderas = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json(maderasMock);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el catálogo de maderas.' });
  }
};