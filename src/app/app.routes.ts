import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';

export const routes: Routes = [
    
    {
        path: '**', // Opcional: rota wildcard para capturar rotas não definidas
        redirectTo: 'home',
    },    
    {
        path: 'home',
        component: HomeComponent
    },
    
];
