import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/database";
import { comparePassword } from "../utils/password";

interface LoginBody {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export const login = async (
  req: Request<{}, {}, LoginBody>,
  res: Response,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email y contraseña son requeridos" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.is_active) {
      res.status(401).json({ error: "Credenciales inválidas" });
      return;
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: "Credenciales inválidas" });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({ error: "Error de configuración del servidor" });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: "8h",
    });

    const response: LoginResponse = {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
