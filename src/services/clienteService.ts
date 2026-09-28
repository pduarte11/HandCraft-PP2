import * as clienteRepository from "../repositories/clienteRepository";
import * as representanteService from "./representanteService";
import { AppError } from "../middlewares/AppError";
import { CreateClienteDTO, UpdateClienteDTO } from "../types/cliente";

function validarNome(nome: unknown) {
  if (typeof nome !== "string" || nome.trim() === "") {
    throw new AppError("Nome/Razão Social é obrigatório", 400);
  }
}

async function validarRepresentante(representanteId: unknown) {
  if (
    typeof representanteId !== "number" ||
    !Number.isInteger(representanteId) ||
    representanteId <= 0
  ) {
    throw new AppError(
      "representanteId é obrigatório e deve ser um número inteiro",
      400
    );
  }

  await representanteService.findById(representanteId); // lança 404 se não existir
}

export function findAll() {
  return clienteRepository.findAll();
}

export async function findById(id: number) {
  const cliente = await clienteRepository.findById(id);

  if (!cliente) {
    throw new AppError("Cliente não encontrado", 404);
  }

  return cliente;
}

export async function create(data: CreateClienteDTO) {
  validarNome(data.nomeRazaoSocial);
  await validarRepresentante(data.representanteId);

  return clienteRepository.create({
    nomeRazaoSocial: data.nomeRazaoSocial.trim(),
    telefone: data.telefone,
    endereco: data.endereco,
    representanteId: data.representanteId,
  });
}

export async function update(id: number, data: UpdateClienteDTO) {
  await findById(id); // atualiza apenas se o cliente existir

  const dados: UpdateClienteDTO = {};

  if (data.nomeRazaoSocial !== undefined) {
    validarNome(data.nomeRazaoSocial);
    dados.nomeRazaoSocial = data.nomeRazaoSocial.trim();
  }
  if (data.telefone !== undefined) {
    dados.telefone = data.telefone;
  }
  if (data.endereco !== undefined) {
    dados.endereco = data.endereco;
  }
  if (data.representanteId !== undefined) {
    await validarRepresentante(data.representanteId);
    dados.representanteId = data.representanteId;
  }

  return clienteRepository.update(id, dados);
}

export async function remove(id: number) {
  await findById(id); // remove apenas se o cliente existir
  return clienteRepository.remove(id);
}
