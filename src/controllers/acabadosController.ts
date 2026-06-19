import { Request, Response } from "express";
import prisma from "../config/database";

export const getAcabados = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const acabados = await prisma.acabado.findMany();
    res.json(acabados);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los acabados" });
  }
};
