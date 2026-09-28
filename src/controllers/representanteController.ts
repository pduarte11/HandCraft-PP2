import { Request, Response } from "express";
import * as representanteService from "../services/representanteService";
import { parseId } from "../utils/parseId";

export async function list(req: Request, res: Response) {
  const representantes = await representanteService.findAll();
  res.json(representantes);
}

export async function getById(req: Request, res: Response) {
  const id = parseId(req.params.id);
  const representante = await representanteService.findById(id);
  res.json(representante);
}

export async function create(req: Request, res: Response) {
  const representante = await representanteService.create(req.body ?? {});
  res.status(201).json(representante);
}

export async function update(req: Request, res: Response) {
  const id = parseId(req.params.id);
  const representante = await representanteService.update(id, req.body ?? {});
  res.json(representante);
}

export async function remove(req: Request, res: Response) {
  const id = parseId(req.params.id);
  await representanteService.remove(id);
  res.status(204).send();
}
