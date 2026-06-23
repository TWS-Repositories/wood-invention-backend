import type { Request, Response } from "express";
import prisma from "../config/database";

interface CrearMaderaBody {
  nombre: string;
  descripcion?: string;
  badge?: string;
  imagen_url?: string;
  precio_m2: number;
}

interface ActualizarMaderaBody {
  nombre?: string;
  descripcion?: string;
  badge?: string;
  imagen_url?: string;
  precio_m2?: number;
}

export const listarMaderas = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const maderas = await prisma.madera.findMany({
      where: { is_active: true },
      select: {
        id: true,
        nombre: true,
        imagen_url: true,
        precio_m2: true,
      },
    });
    res.status(200).json(maderas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el catálogo de maderas." });
  }
};

export const crearMadera = async (
  req: Request<{}, {}, CrearMaderaBody>,
  res: Response,
): Promise<void> => {
  try {
    const { nombre, descripcion, badge, imagen_url, precio_m2 } = req.body;

    if (!nombre || precio_m2 === undefined) {
      res
        .status(400)
        .json({ error: "Los campos nombre y precio_m2 son obligatorios." });
      return;
    }

    const precio_m2_num = Number(precio_m2);
    if (isNaN(precio_m2_num) || precio_m2_num <= 0) {
      res
        .status(400)
        .json({ error: "El precio_m2 debe ser un número válido mayor a 0." });
      return;
    }

    const nuevaMadera = await prisma.madera.create({
      data: {
        nombre,
        descripcion,
        badge,
        imagen_url,
        precio_m2: precio_m2_num,
      },
    });

    res.status(201).json(nuevaMadera);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la madera." });
  }
};

export const actualizarMadera = async (
  req: Request<{ id: string }, {}, ActualizarMaderaBody>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, badge, imagen_url, precio_m2 } = req.body;

    const id_num = Number(id);
    if (isNaN(id_num) || id_num <= 0) {
      res.status(400).json({ error: "El ID debe ser un número válido." });
      return;
    }

    const maderaExistente = await prisma.madera.findUnique({
      where: { id: id_num },
    });

    if (!maderaExistente) {
      res.status(404).json({ error: "Madera no encontrada." });
      return;
    }

    const datosActualizacion: any = {};
    if (nombre !== undefined) datosActualizacion.nombre = nombre;
    if (descripcion !== undefined) datosActualizacion.descripcion = descripcion;
    if (badge !== undefined) datosActualizacion.badge = badge;
    if (imagen_url !== undefined) datosActualizacion.imagen_url = imagen_url;
    if (precio_m2 !== undefined) {
      const precio_m2_num = Number(precio_m2);
      if (isNaN(precio_m2_num) || precio_m2_num <= 0) {
        res
          .status(400)
          .json({ error: "El precio_m2 debe ser un número válido mayor a 0." });
        return;
      }
      datosActualizacion.precio_m2 = precio_m2_num;
    }

    const maderaActualizada = await prisma.madera.update({
      where: { id: id_num },
      data: datosActualizacion,
    });

    res.status(200).json(maderaActualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la madera." });
  }
};

export const eliminarMadera = async (
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

    const maderaExistente = await prisma.madera.findUnique({
      where: { id: id_num },
    });

    if (!maderaExistente) {
      res.status(404).json({ error: "Madera no encontrada." });
      return;
    }

    await prisma.madera.update({
      where: { id: id_num },
      data: { is_active: false },
    });

    res
      .status(200)
      .json({ message: "Madera eliminada exitosamente (soft delete)." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la madera." });
  }
};
