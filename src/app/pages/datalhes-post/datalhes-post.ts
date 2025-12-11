/* eslint-disable dot-notation */
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { DatePipe } from '@angular/common';
import { map, switchMap, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Post } from '../../models/post.model';
import PostService from '../../services/post/post.service';
import { ComentarioService } from '../../services/comentario/comentario.service';
import {
  Comentario as tipoComentario,
  ComentarioCreateDTO,
  ComentarioUpdateDTO,
} from '../../models/comentario.model';
import { Comentario } from '../../components/shared/comentario/comentario';
import { ConfirmModal } from '../../components/shared/confirm-modal/confirm-modal';
import { ModalWraper } from '../../components/shared/modal-wraper/modal-wraper';

@Component({
  selector: 'app-datalhes-post',
  imports: [DatePipe, Comentario, ConfirmModal, ModalWraper, FormsModule, RouterLink],
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

  comentarioParaEditar: tipoComentario | null = null;

  comentarioParaExcluir: tipoComentario | null = null;

  comentarioParaCriar: ComentarioCreateDTO | null = null;

  postParaExcluir: Post | null = null;

  ngOnInit() {
    this.router.params
      .pipe(
        map((params) => params['slug']),
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
        this.comentarios = comentarios.content.filter((c) => c.aprovado);
      });
  }

  editar() {
    this.route.navigate(['/posts/editar', this.postCorrente.slug]);
  }

  carregarComentarios() {
    this.comentarioService.obterComentarios(this.postCorrente.id).subscribe({
      next: (result) => {
        this.comentarios = result.content.filter((c) => c.aprovado);
      },
    });
  }

  deletarComentario() {
    if (!this.comentarioParaExcluir) return;
    this.comentarioService
      .deletarComentario(this.comentarioParaExcluir.id)
      .pipe(
        this.toast.observe({
          success: 'Comentario deletado com sucesso!',
          error: 'Ocorreu um erro ao deletar o comentario.',
          loading: 'Carregando...',
        }),
      )
      .subscribe(() => {
        this.fecharModais();
        this.carregarComentarios();
      });
  }

  deletarPost() {
    if (!this.postParaExcluir) return;
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

  salvarEdicao() {
    if (!this.comentarioParaEditar?.id) return;
    const corpoParaEditar: ComentarioUpdateDTO = {
      autor: this.comentarioParaEditar.autor,
      conteudo: this.comentarioParaEditar.conteudo,
      usuario: this.comentarioParaEditar.usuario,
    };
    this.comentarioService
      .atualizarComentario(this.comentarioParaEditar.id, corpoParaEditar)
      .pipe(
        this.toast.observe({
          success: 'Sucesso ao editar comentario',
          error: 'Erro ao editar comnetário',
          loading: 'Carregando...',
        }),
      )
      .subscribe({
        next: () => {
          this.fecharModais();
          this.carregarComentarios();
        },
      });
  }

  criarComentario() {
    if (!this.comentarioParaCriar) {
      this.toast.error('Ocorreu um erro ao crriar comentário!');
      return;
    }

    if (!this.comentarioParaCriar.conteudo.trim()) {
      this.toast.error('O conteúdo do comentário é obrigatoório');
    }

    console.log(this.comentarioParaCriar);

    this.comentarioService
      .criarComentario(this.comentarioParaCriar)
      .pipe(
        this.toast.observe({
          success: 'Comentário criado com sucesso! Aguardando validação',
          error: 'Ocorreu um erro ao criar o comentário',
          loading: 'Criando...',
        }),
      )
      .subscribe();
  }

  iniciarEdicao(comentario: tipoComentario) {
    this.comentarioParaEditar = { ...comentario };
  }

  iniciarExclusaoPost(post: Post) {
    this.postParaExcluir = post;
  }

  iniciarExclusao(comentario: tipoComentario) {
    this.comentarioParaExcluir = comentario;
  }

  iniciarCriacao() {
    if (!this.postCorrente) return;

    this.comentarioParaCriar = {
      postId: this.postCorrente.id,
      autor: '',
      usuario: '',
      conteudo: '',
    };
  }

  fecharModais() {
    this.comentarioParaEditar = null;
    this.comentarioParaExcluir = null;
    this.postParaExcluir = null;
  }
}
