import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Teste } from './components/teste/teste';
import { DatalhesPost } from './pages/datalhes-post/datalhes-post';
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
        component: Teste,
      },
      {
        path: 'posts/:slug',
        title: 'Lendo Artigo',
        component: DatalhesPost,
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
