import { Routes } from '@angular/router';
import { propostaResolver } from './proposta.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./proposta/proposta.component')
      .then(m => m.PropostaComponent),
    resolve: { proposta: propostaResolver }
  },
];
