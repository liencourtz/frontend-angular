import { Component, inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from 'express';
import { UserFormControls } from '../../../core/models/user/user-form.model';
import { User } from '../../../core/models/user/user.model';
import { UserService } from '../../../core/services/user/user.service';
import { ModalComponent, ModalData } from '../../../layout/modal/modal.component';

@Component({
  selector: 'app-forms-edit-user',
  imports: [],
  templateUrl: './forms-edit-user.component.html',
  styleUrl: './forms-edit-user.component.scss'
})
export class FormsEditUserComponent {

  
  @ViewChild('userModal') userModal!: ModalComponent; // Referência ao modal

  private readonly userService = inject(UserService);
  private readonly router = inject(Router);


  // Define the form group with the structure of the UserFormControls
  // This will allow us to create a strongly typed form
  newForm = new FormGroup<UserFormControls>({
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
    return this.newForm.controls;
  }
  
  onSubmit() {

    console.log('🔥 onSubmit foi chamado!');
    console.log('📋 Form válido?', this.newForm.valid);
    console.log('📝 Dados do form:', this.newForm.value);
    
    // Check if the form is valid before proceeding
    if (this.newForm.invalid) {      
      console.error('Form is invalid');
      this.newForm.markAllAsTouched(); // Mark all controls as touched to show validation errors

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
      const userInput : User = this.newForm.getRawValue();

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
    this.newForm.reset();
    this.router.navigate(['/user/list']);
  }
}
