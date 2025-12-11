import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { ListaDePosts } from './pages/lista-de-posts/lista-de-posts';
// TODO: Adicinoar comopnentes respectivos
export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
      {
        path: 'posts',
        title: 'Blogango - Posts',
        component: ListaDePosts,
      },
      /*
      {
        path: 'posts/novo',
        title: 'Criar Novo Post',
      },
      {
        path: 'posts/editar/:id',
        title: 'Editar Post',
      },
      {
        path: 'posts/:slug',
        title: 'Lendo Artigo',
      },
      {
        path: 'rascunhos',
        title: 'Meus Rascunhos',
      },
      {
        path: 'rascunhos/editar/:id',
        title: 'Editar Rascunho',
      },
      {
        path: 'comentarios',
        title: 'Gerenciar Comentários',
      },
      */
    ],
  },
];
