import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { DatePipe } from '@angular/common';
import { map, switchMap, tap } from 'rxjs';
import { Post } from '../../models/post.model';
import PostService from '../../services/post/post.service';
import { ComentarioService } from '../../services/comentario/comentario.service';
import { Comentario as tipoComentario } from '../../models/comentario.model';
import { Comentario } from '../../components/shared/comentario/comentario';

@Component({
  selector: 'app-datalhes-post',
  imports: [DatePipe, Comentario],
  templateUrl: './datalhes-post.html',
  styleUrl: './datalhes-post.css',
})
export class DatalhesPost implements OnInit {
  private router = inject(ActivatedRoute);

  private route = inject(Router);

  private postService = inject(PostService);

  private comentarioService = inject(ComentarioService);

  private toast = inject(HotToastService);

  postCorrente!: Post;

  comentarios: tipoComentario[] = [];

  ngOnInit() {
    this.router.params
      .pipe(
        map((params) => params.slug),
        switchMap((slug) => this.postService.obterPostPorSlug(slug)),
        tap((post) => {
          this.postCorrente = post;
        }),
        switchMap((post) => this.comentarioService.obterComentarios(post.id)),
        this.toast.observe({
          loading: 'Carregando post e comentários...',
          success: 'Conteúdo carregado com sucesso!',
          error: 'Ocorreu um erro ao carregar.',
        }),
      )
      .subscribe((comentarios) => {
        this.comentarios = comentarios.content;
      });
  }

  excluirPost() {
    this.postService
      .deletarPost(this.postCorrente.id)
      .pipe(
        this.toast.observe({
          success: 'Post deletado com sucesso!',
          error: 'Ocorreu um erro ao deletar o post.',
          loading: 'Carregando...',
        }),
      )
      .subscribe(() => {
        this.route.navigate(['/posts']);
      });
  }
}
