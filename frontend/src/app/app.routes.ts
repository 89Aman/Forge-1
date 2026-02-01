import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    path: 'exam',
    loadComponent: () => import('./exam/exam').then((m) => m.Exam),
  },
  {
    path: 'verify',
    loadComponent: () => import('./cert/cert').then((m) => m.Cert),
  },
  {
    path: 'verify/:id',
    loadComponent: () => import('./cert/cert').then((m) => m.Cert),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
