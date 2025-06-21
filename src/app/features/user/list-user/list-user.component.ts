import { Component, inject } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../../../core/models/user/user.model';
import { map, startWith, catchError, of } from 'rxjs';

@Component({
  selector: 'app-list-user',
  imports: [],
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
