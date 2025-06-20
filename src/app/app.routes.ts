import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { FormsRegisterUserComponent } from './features/user/forms-register-user/forms-register-user.component';

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
        path: '**', // Opcional: rota wildcard para capturar rotas não definidas
        redirectTo: 'home',
    }
    
];
