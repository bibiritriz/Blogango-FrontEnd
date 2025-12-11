/* eslint-disable no-plusplus */
import { Component, inject, OnInit } from '@angular/core';
import { SearchInput } from '../../components/shared/search-input/search-input';
import { PostComponent } from '../../components/shared/post/post';
import { Post } from '../../models/post.model';
import PostService from '../../services/post/post.service';

@Component({
  selector: 'app-lista-de-posts',
  imports: [SearchInput, PostComponent],
  templateUrl: './lista-de-posts.html',
  styleUrl: './lista-de-posts.css',
})
export class ListaDePosts implements OnInit {
  paginaAtual: number = 0;

  totalDePaginas: number = 1;

  isPrimeiraPagina: boolean = true;

  isUltimaPagina: boolean = true;

  todosOsPosts: Post[] = [];

  postsExibidos: Post[] = [];

  tituloParaBusca: string = '';

  private readonly postService = inject(PostService);

  ngOnInit(): void {
    this.carregarPosts();
  }

  carregarPosts() {
    if (this.tituloParaBusca.trim()) {
      this.filtrarPosts(this.tituloParaBusca);
    } else {
      this.postService.listar(this.paginaAtual, 3).subscribe({
        next: (page) => {
          this.todosOsPosts = page.content;
          this.postsExibidos = page.content;
          this.totalDePaginas = page.totalPages;
          this.isUltimaPagina = page.last;
          this.isPrimeiraPagina = page.first;
        },
        error: (err) => console.log(err),
      });
    }
  }

  filtrarPosts(titulo: string) {
    this.tituloParaBusca = titulo.trim();
    if (this.tituloParaBusca) {
      this.postService.buscarPorTitulo(titulo, this.paginaAtual, 3).subscribe({
        next: (page) => {
          this.postsExibidos = page.content;
          this.totalDePaginas = page.totalPages;
          this.isUltimaPagina = page.last;
          this.isPrimeiraPagina = page.first;
        },
        error: (err) => console.log(err),
      });
    } else {
      this.postsExibidos = this.todosOsPosts;
      this.carregarPosts();
    }
  }

  proximaPagina() {
    if (!this.isUltimaPagina) {
      this.paginaAtual++;
      this.carregarPosts();
    }
  }

  paginaAnterior() {
    if (!this.isPrimeiraPagina) {
      this.paginaAtual--;
      this.carregarPosts();
    }
  }
}
