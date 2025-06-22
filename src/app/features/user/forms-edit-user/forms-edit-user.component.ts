import { Component, effect, inject, input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserFormControls } from '../../../core/models/user/user-form.model';
import { User } from '../../../core/models/user/user.model';
import { UserService } from '../../../core/services/user/user.service';
import { ModalComponent, ModalData } from '../../../layout/modal/modal.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CpfDirective } from '../../../utils/directives/cpf.directive';
import { PhoneNumberDirective } from '../../../utils/directives/phone-number.directive';

@Component({
  selector: 'app-forms-edit-user',
  imports: [
    ReactiveFormsModule, //! Import ReactiveFormsModule for form handling
    ModalComponent, //! Import ModalComponent for modal dialogs
    CpfDirective, //! Import CpfDirective for CPF input masking
    PhoneNumberDirective //! Import PhoneNumberDirective for phone number input masking
  ],
  templateUrl: './forms-edit-user.component.html',
  styleUrl: './forms-edit-user.component.scss'
})
export class FormsEditUserComponent {

  /**
   * O alias 'id' é usado para receber o ID do usuário a ser editado via parâmetro de rota.
   * se não existe alias, o id da variavel deve ser identico ao nome do parâmetro de rota.
   * Por exemplo, se a rota é 'user-edit/:id', o parâmetro de rota será acessível como 'id'.
   * Automaticamente, o Angular irá mapear o parâmetro de rota para a propriedade 'id' do componente.
  */  
  id = input<number | undefined>(undefined, {alias : 'id_usuario'}) 
  
  @ViewChild('userModal') userModal!: ModalComponent; // Referência ao modal

  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  // Usando rxResource para carregar o usuário
  userResource = rxResource({
    request: () => ({ id: this.id() }),
    loader: ({ request }) => {
      // Só carrega se o ID estiver definido
      if (!request.id) {
        return of(null);
      }
      return this.userService.getUserById(request.id);
    }
  });

  // Effect para preencher o formulário quando os dados do usuário são carregados
  private fillFormEffect = effect(() => {
    const user = this.userResource.value();
    
    if (user) {
      console.log('Usuário recuperado:', user);
      // Fill the form with user data, this is possible because the form controls are strongly typed like the User model
      this.editForm.patchValue(user); 
    }

  });


  // Define the form group with the structure of the UserFormControls
  // This will allow us to create a strongly typed form
  editForm = new FormGroup<UserFormControls>({
    nome: new FormControl<string>('',
      { nonNullable: true, validators: [Validators.minLength(8)] }),
    email: new FormControl<string>('',
      { nonNullable: true, validators: [Validators.email] }),
    senha: new FormControl<string>('',
      { nonNullable: true, validators: [Validators.minLength(8)]}),
    cpf: new FormControl<string>('',
      { nonNullable: true, validators: [Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)] }),
    telefone: new FormControl<string>('',
      { nonNullable: true, validators: [Validators.pattern(/^(\d{2}\s)?\(\d{2}\)\s\d{5}-\d{4}$/)] }),
    data_cadastro: new FormControl<Date>(new Date(),
      { nonNullable: true, validators: [] }),
    ativo: new FormControl<boolean>(true,
      { nonNullable: true, validators: [] })   
  })

  // Getter to access form controls easily on forms
  get controls() {
    return this.editForm.controls;
  }
  
  onSubmit() {

    console.log('🔥 onSubmit foi chamado!');
    console.log('📋 Form válido?', this.editForm.valid);
    console.log('📝 Dados do form:', this.editForm.value);
    
    // Check if the form is valid before proceeding
    if (this.editForm.invalid) {      
      console.error('Form is invalid');
      this.editForm.markAllAsTouched(); // Mark all controls as touched to show validation errors

      //Call modal to show error message
      const modalData: ModalData = {
        title: 'Erro de Validação',
        message: 'Por favor, corrija os campos obrigatórios antes de continuar.',
        success: false,
        showConfirm: false
      };
      this.userModal.show(modalData);

      return;
    }
      // Get the form values
      // Using getRawValue to include all form controls, even those that are disabled
      const userInput: User = this.editForm.getRawValue();
      userInput.id_usuario = this.id(); // Set the user ID from the input parameter

      this.userService.updateUser(userInput).subscribe({
        next: (response) => {

          console.log('User created successfully:', response);
          
          // Call modal on success
          const modalData: ModalData = {
            title: 'Sucesso!',
            message: `Usuário ${userInput.nome} foi cadastrado com sucesso!`,
            success: true,
            details: response, // Detalhes da resposta da API
            showConfirm: true,
            confirmText: 'OK'
          };
          this.userModal.show(modalData);
        },
        error: (error) => {

          console.error('Error creating user:', error);

          // Call modal on error
          const modalData: ModalData = {
            title: 'Erro no Cadastro',
            message: error,
            success: false,
            details: error.error || error.message, // Detalhes do erro
            showConfirm: false
          };
          this.userModal.show(modalData);
        }

      });

      // this.newForm.reset(); // Reset the form after successful submission
      // this.router.navigate(['/user/list']); // Navigate to the user list page after successful submission

  }
  
  // Método chamado quando o usuário confirma no modal
  onModalConfirmed() {
    console.log('✅ Usuário confirmou no modal');
    
    // Limpa o formulário e navega para lista
    this.editForm.reset();
    this.router.navigate(['/list-users']);
  }
}
