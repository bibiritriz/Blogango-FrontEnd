import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { ListaDePosts } from './pages/lista-de-posts/lista-de-posts';
import { DatalhesPost } from './pages/datalhes-post/datalhes-post';
import { Comentarios } from './pages/comentarios/comentarios';
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
      {
        path: 'posts/:slug',
        title: 'Lendo Artigo',
        component: DatalhesPost,
      },
      {
        path: 'comentarios',
        title: 'Gerenciar Comentários',
        component: Comentarios,
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
