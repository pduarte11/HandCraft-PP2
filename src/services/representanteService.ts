import * as representanteRepository from "../repositories/representanteRepository";
import * as clienteRepository from "../repositories/clienteRepository";
import { AppError } from "../middlewares/AppError";
import { CreateRepresentanteDTO, UpdateRepresentanteDTO } from "../types/representante";

function validarNome(nome: unknown) {
  if (typeof nome !== "string" || nome.trim() === "") {
    throw new AppError("Nome é obrigatório", 400);
  }
}

function validarComissao(valor: unknown) {
  if (
    typeof valor !== "number" ||
    Number.isNaN(valor) ||
    valor < 0 ||
    valor > 100
  ) {
    throw new AppError(
      "Percentual de comissão é obrigatório e deve ser um número entre 0 e 100",
      400
    );
  }
}

export function findAll() {
  return representanteRepository.findAll();
}

export async function findById(id: number) {
  const representante = await representanteRepository.findById(id);

  if (!representante) {
    throw new AppError("Representante não encontrado", 404);
  }

  return representante;
}

export function create(data: CreateRepresentanteDTO) {
  validarNome(data.nome);
  validarComissao(data.percentualComissao);

  // monta o objeto campo a campo: ignora qualquer campo extra enviado no body
  return representanteRepository.create({
    nome: data.nome.trim(),
    telefone: data.telefone,
    percentualComissao: data.percentualComissao,
  });
}

export async function update(id: number, data: UpdateRepresentanteDTO) {
  await findById(id); // atualiza apenas se o representante existir

  const dados: UpdateRepresentanteDTO = {};

  if (data.nome !== undefined) {
    validarNome(data.nome);
    dados.nome = data.nome.trim();
  }
  if (data.telefone !== undefined) {
    dados.telefone = data.telefone;
  }
  if (data.percentualComissao !== undefined) {
    validarComissao(data.percentualComissao);
    dados.percentualComissao = data.percentualComissao;
  }

  return representanteRepository.update(id, dados);
}

export async function remove(id: number) {
  await findById(id); // remove apenas se o representante existir

  // Regra do relacionamento: bloqueia exclusao se houver clientes vinculados
  const totalClientes = await clienteRepository.countByRepresentanteId(id);
  if (totalClientes > 0) {
    throw new AppError(
      `Não é possível remover: o representante possui ${totalClientes} cliente(s) vinculado(s)`,
      409
    );
  }

  return representanteRepository.remove(id);
}
