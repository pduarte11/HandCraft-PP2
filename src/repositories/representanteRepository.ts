import { prisma } from "../config/prisma";
import { CreateRepresentanteDTO, UpdateRepresentanteDTO } from "../types/representante";

export function findAll() {
  return prisma.representante.findMany({ orderBy: { id: "asc" } });
}

export function findById(id: number) {
  return prisma.representante.findUnique({
    where: { id },
  });
}

export function create(data: CreateRepresentanteDTO) {
  return prisma.representante.create({ data });
}

export function update(id: number, data: UpdateRepresentanteDTO) {
  return prisma.representante.update({
    where: { id },
    data,
  });
}

export function remove(id: number) {
  return prisma.representante.delete({
    where: { id },
  });
}
