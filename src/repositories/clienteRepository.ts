import { prisma } from "../config/prisma";
import { CreateClienteDTO, UpdateClienteDTO } from "../types/cliente";

export function findAll() {
  return prisma.cliente.findMany({
    include: { representante: true },
    orderBy: { id: "asc" },
  });
}

export function findById(id: number) {
  return prisma.cliente.findUnique({
    where: { id },
    include: { representante: true },
  });
}

export function create(data: CreateClienteDTO) {
  return prisma.cliente.create({
    data,
    include: { representante: true },
  });
}

export function update(id: number, data: UpdateClienteDTO) {
  return prisma.cliente.update({
    where: { id },
    data,
    include: { representante: true },
  });
}

export function remove(id: number) {
  return prisma.cliente.delete({
    where: { id },
  });
}

// Usado pelo service de Representante para bloquear exclusao
export function countByRepresentanteId(representanteId: number) {
  return prisma.cliente.count({ where: { representanteId } });
}
