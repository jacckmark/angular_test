import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./features/user/user.routes').then(m => m.USER_ROUTES)
  },
  {
    path: 'posts',
    loadChildren: () => import('./features/post/post.routes').then(m => m.POST_ROUTES)
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  }
];
