import { Routes } from '@angular/router';

export const POST_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/post-list/post-list').then(m => m.PostList),
    title: 'All Posts'
  },
  {
    path: 'add',
    loadComponent: () => import('./pages/post-create/post-create').then(m => m.PostCreate),
    title: 'Add New Post'
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./pages/post-edit/post-edit').then(m => m.PostEdit),
    title: 'Edit Post'
  }
];
