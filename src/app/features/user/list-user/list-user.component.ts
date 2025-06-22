import { Component, inject } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-user',
  imports: [RouterLink],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss'
})
export class ListUserComponent {

  private readonly userService = inject(UserService);

  users = toSignal(
    this.userService.getUsers().pipe(
      
      catchError((error) => { 
        console.error('❌ Erro ao buscar usuários:', error);
        return of([]);
      })
    ),
    { initialValue: [] }
  );

}
