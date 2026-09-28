export interface CreateClienteDTO {
  nomeRazaoSocial: string;
  telefone?: string;
  endereco?: string;
  representanteId: number;
}

export interface UpdateClienteDTO {
  nomeRazaoSocial?: string;
  telefone?: string;
  endereco?: string;
  representanteId?: number;
}
