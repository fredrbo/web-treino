import { Routes } from '@angular/router';
import { Welcome } from './pages/welcome/welcome';
import { Users } from './pages/users/users';
import { Treinos } from './pages/treinos/treinos';
import { Exercicios } from './pages/exercicios/exercicios';
import { Historico } from './pages/historico/historico';

export const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: Welcome },
  { path: 'users', component: Users },
  { path: 'treinos', component: Treinos },
  { path: 'exercicios', component: Exercicios },
  { path: 'historico', component: Historico }
];
