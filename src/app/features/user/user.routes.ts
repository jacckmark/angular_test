import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/user-list/user-list').then(m => m.UserList),
    title: 'All Users'
  },
  {
    path: 'add',
    loadComponent: () => import('./pages/user-create/user-create').then(m => m.UserCreate),
    title: 'Add New User'
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./pages/user-edit/user-edit').then(m => m.UserEdit),
    title: 'Edit User'
  }
];
