import { Component, inject } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserFormControls } from '../../../core/models/user/user-form.model';
import { User } from '../../../core/models/user/user.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-forms-register-user',
  imports: [ReactiveFormsModule], // Import ReactiveFormsModule for form handling
  templateUrl: './forms-register-user.component.html',
  styleUrl: './forms-register-user.component.scss'
})
  
export class FormsRegisterUserComponent {

  private readonly userService = inject(UserService);
  private readonly router = inject(Router);


  // Define the form group with the structure of the UserFormControls
  // This will allow us to create a strongly typed form
  newForm = new FormGroup<UserFormControls>({
    nome: new FormControl<string>('',
      { nonNullable: true, validators: [] }),
    email: new FormControl<string>('',
      { nonNullable: true, validators: [] }),
    senha: new FormControl<string>('',
      { nonNullable: true, validators: [] }),
    cpf: new FormControl<string>('',
      { nonNullable: true, validators: [] }),
    telefone: new FormControl<string>('',
      { nonNullable: true, validators: [] }),
    data_cadastro: new FormControl<Date>(new Date(),
      { nonNullable: true, validators: [] }),
    ativo: new FormControl<boolean>(true,
      { nonNullable: true, validators: [] })   
  })

  // Getter to access form controls easily on forms
  get controls() {
    return this.newForm.controls;
  }
  
  async onSubmit() {

    // Check if the form is valid before proceeding
    if (this.newForm.invalid) {
      console.error('Form is invalid');
      this.newForm.markAllAsTouched(); // Mark all controls as touched to show validation errors
      return;
    }

    try {

      // Get the form values
      // Using getRawValue to include all form controls, even those that are disabled
      const userInput : User = this.newForm.getRawValue();

      await this.userService.insertUser(userInput);

      this.newForm.reset(); // Reset the form after successful submission
      this.router.navigate(['/user/list']); // Navigate to the user list page after successful submission
      console.log('Form submitted successfully:', userInput);

    }
    catch (error) {
      console.error('Error submitting form:', error);
    }

  }
}    
  


