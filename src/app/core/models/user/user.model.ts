export interface User {
  id_usuario?: number | null;
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  telefone: string;
  data_cadastro: Date;
  ativo: boolean | null;
}
