import type { Request, Response } from "express";
import prisma from "../config/database";

interface CrearHerrajeBody {
  nombre: string;
  descripcion?: string;
  precio_unidad: number;
}

interface ActualizarHerrajeBody {
  nombre?: string;
  descripcion?: string;
  precio_unidad?: number;
}

export const listarHerrajes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const herrajes = await prisma.herraje.findMany({
      where: { is_active: true },
      select: {
        id: true,
        nombre: true,
        precio_unidad: true,
      },
    });
    res.status(200).json(herrajes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener el catálogo de herrajes." });
  }
};

export const crearHerraje = async (
  req: Request<{}, {}, CrearHerrajeBody>,
  res: Response,
): Promise<void> => {
  try {
    const { nombre, descripcion, precio_unidad } = req.body;

    if (!nombre || precio_unidad === undefined) {
      res
        .status(400)
        .json({ error: "Los campos nombre y precio_unidad son obligatorios." });
      return;
    }

    const precio_unidad_num = Number(precio_unidad);
    if (isNaN(precio_unidad_num) || precio_unidad_num <= 0) {
      res.status(400).json({
        error: "El precio_unidad debe ser un número válido mayor a 0.",
      });
      return;
    }

    const nuevoHerraje = await prisma.herraje.create({
      data: {
        nombre,
        descripcion,
        precio_unidad: precio_unidad_num,
      },
    });

    res.status(201).json(nuevoHerraje);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el herraje." });
  }
};

export const actualizarHerraje = async (
  req: Request<{ id: string }, {}, ActualizarHerrajeBody>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio_unidad } = req.body;

    const id_num = Number(id);
    if (isNaN(id_num) || id_num <= 0) {
      res.status(400).json({ error: "El ID debe ser un número válido." });
      return;
    }

    const herrajeExistente = await prisma.herraje.findUnique({
      where: { id: id_num },
    });

    if (!herrajeExistente) {
      res.status(404).json({ error: "Herraje no encontrado." });
      return;
    }

    const datosActualizacion: any = {};
    if (nombre !== undefined) datosActualizacion.nombre = nombre;
    if (descripcion !== undefined) datosActualizacion.descripcion = descripcion;
    if (precio_unidad !== undefined) {
      const precio_unidad_num = Number(precio_unidad);
      if (isNaN(precio_unidad_num) || precio_unidad_num <= 0) {
        res.status(400).json({
          error: "El precio_unidad debe ser un número válido mayor a 0.",
        });
        return;
      }
      datosActualizacion.precio_unidad = precio_unidad_num;
    }

    const herrajeActualizado = await prisma.herraje.update({
      where: { id: id_num },
      data: datosActualizacion,
    });

    res.status(200).json(herrajeActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el herraje." });
  }
};

export const eliminarHerraje = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const id_num = Number(id);
    if (isNaN(id_num) || id_num <= 0) {
      res.status(400).json({ error: "El ID debe ser un número válido." });
      return;
    }

    const herrajeExistente = await prisma.herraje.findUnique({
      where: { id: id_num },
    });

    if (!herrajeExistente) {
      res.status(404).json({ error: "Herraje no encontrado." });
      return;
    }

    await prisma.herraje.update({
      where: { id: id_num },
      data: { is_active: false },
    });

    res
      .status(200)
      .json({ message: "Herraje eliminado exitosamente (soft delete)." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el herraje." });
  }
};
