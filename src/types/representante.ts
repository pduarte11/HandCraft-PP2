export interface CreateRepresentanteDTO {
  nome: string;
  telefone?: string;
  percentualComissao: number;
}

export interface UpdateRepresentanteDTO {
  nome?: string;
  telefone?: string;
  percentualComissao?: number;
}
