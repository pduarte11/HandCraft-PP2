import { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  const erro = err as { type?: string; code?: string };

  if (erro?.type === "entity.parse.failed") {
    return res.status(400).json({ message: "JSON inválido no corpo da requisição" });
  }

  if (erro?.code === "P2003") {
    return res
      .status(409)
      .json({ message: "Operação bloqueada: existem registros vinculados" });
  }

  console.error(err);
  return res.status(500).json({ message: "Erro interno" });
}
