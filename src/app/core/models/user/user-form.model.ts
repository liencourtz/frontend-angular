import { FormControl } from "@angular/forms";

// Define the structure of the form controls
export interface UserFormControls{

  nome: FormControl<string>;
  email: FormControl<string>;
  senha: FormControl<string>;
  cpf: FormControl<string>;
  telefone: FormControl<string>;
  data_cadastro: FormControl<Date>;
  ativo: FormControl<boolean | null>;
  
}