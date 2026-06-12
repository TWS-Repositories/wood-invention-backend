import type { Request, Response } from 'express';

const herrajesMock = [
  { id: 1, nombre: 'Bisagra Cierre Suave', tipo: 'Apertura', precioBase: 850, estado: 'ACTIVO' },
  { id: 2, nombre: 'Guía Telescópica 45mm', tipo: 'Cajón', precioBase: 1200, estado: 'ACTIVO' },
  { id: 3, nombre: 'Tirador de Aluminio Perfil', tipo: 'Manija', precioBase: 600, estado: 'ACTIVO' }
];

export const listarHerrajes = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("entro a herrajes");
    
    res.status(200).json(herrajesMock);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el catálogo de herrajes.' });
  }
};