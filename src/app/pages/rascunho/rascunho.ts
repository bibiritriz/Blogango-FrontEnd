import { Component, inject, OnInit } from '@angular/core';
import { PostComponent } from '../../components/shared/post/post';
import { SearchInput } from '../../components/shared/search-input/search-input';
import { Post } from '../../models/post.model';
import PostService from '../../services/post/post.service';

@Component({
  selector: 'app-rascunho',
  imports: [PostComponent, SearchInput],
  templateUrl: './rascunho.html',
  styleUrl: './rascunho.css',
})
export class Rascunho implements OnInit {
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
      this.postService.buscarRascunhos(this.paginaAtual, 3).subscribe({
        next: (page) => {
          this.todosOsPosts = page.content;
          this.postsExibidos = page.content;
          this.totalDePaginas = page.totalPages;
          this.isUltimaPagina = page.last;
          this.isPrimeiraPagina = page.first;
        },
      });
    }
  }

  proximaPagina() {
    console.log(this.postsExibidos);
    if (!this.isUltimaPagina) {
      this.paginaAtual += 1;
      this.carregarPosts();
    }
  }

  paginaAnterior() {
    if (!this.isPrimeiraPagina) {
      this.paginaAtual -= 1;
      this.carregarPosts();
    }
  }
}
