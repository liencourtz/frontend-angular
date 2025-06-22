import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { FormsRegisterUserComponent } from './features/user/forms-register-user/forms-register-user.component';
import { ListUserComponent } from './features/user/list-user/list-user.component';
import { FormsEditUserComponent } from './features/user/forms-edit-user/forms-edit-user.component';

export const routes: Routes = [    
      
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'new-user',
        component: FormsRegisterUserComponent
    },
    {
        path: 'edit-user/:id_usuario',
        component: FormsEditUserComponent
    },
    {
        path: 'list-users',
        component: ListUserComponent
    },
    {
        path: '**', // Opcional: rota wildcard para capturar rotas não definidas
        redirectTo: 'home',
    }

];