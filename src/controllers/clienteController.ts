import { Request, Response } from "express";
import * as clienteService from "../services/clienteService";
import { parseId } from "../utils/parseId";

export async function list(req: Request, res: Response) {
  const clientes = await clienteService.findAll();
  res.json(clientes);
}

export async function getById(req: Request, res: Response) {
  const id = parseId(req.params.id);
  const cliente = await clienteService.findById(id);
  res.json(cliente);
}

export async function create(req: Request, res: Response) {
  const cliente = await clienteService.create(req.body ?? {});
  res.status(201).json(cliente);
}

export async function update(req: Request, res: Response) {
  const id = parseId(req.params.id);
  const cliente = await clienteService.update(id, req.body ?? {});
  res.json(cliente);
}

export async function remove(req: Request, res: Response) {
  const id = parseId(req.params.id);
  await clienteService.remove(id);
  res.status(204).send();
}
