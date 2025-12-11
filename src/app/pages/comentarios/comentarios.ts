import { Component, inject, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { ComentarioService } from '../../services/comentario/comentario.service';
import {
  Comentario as tipoComentario,
  Comentario as TipoComentario,
} from '../../models/comentario.model';
import { Comentario } from '../../components/shared/comentario/comentario';
import { ModalWraper } from '../../components/shared/modal-wraper/modal-wraper';
import { ConfirmModal } from '../../components/shared/confirm-modal/confirm-modal';
import PostService from '../../services/post/post.service';

@Component({
  selector: 'app-comentarios',
  imports: [Comentario, ModalWraper, ConfirmModal],
  templateUrl: './comentarios.html',
  styleUrl: './comentarios.css',
})
export class Comentarios implements OnInit {
  private comentariosService = inject(ComentarioService);

  private toast = inject(HotToastService);

  private postService = inject(PostService);

  comentarioParaAprovar: TipoComentario | null = null;

  titulorPostEditar: string | null = null;

  comentarioParaExcluir: tipoComentario | null = null;

  comentarios: TipoComentario[] = [];

  paginaAtual: number = 0;

  totalDePaginas: number = 1;

  isPrimeiraPagina: boolean = true;

  isUltimaPagina: boolean = true;

  ngOnInit() {
    this.carregarComentarios();
  }

  carregarComentarios() {
    this.comentariosService.obterComentariosAprovadosFalse(this.paginaAtual, 3).subscribe({
      next: (page) => {
        this.comentarios = page.content;
        this.totalDePaginas = page.totalPages;
        this.isUltimaPagina = page.last;
        this.isPrimeiraPagina = page.first;
      },
    });
  }

  deletarComentario() {
    if (!this.comentarioParaExcluir) return;
    this.comentariosService
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

  iniciarExclusao(comentario: tipoComentario) {
    this.comentarioParaExcluir = comentario;
  }

  proximaPagina() {
    if (!this.isUltimaPagina) {
      this.paginaAtual += 1;
      this.carregarComentarios();
    }
  }

  paginaAnterior() {
    if (!this.isPrimeiraPagina) {
      this.paginaAtual -= 1;
      this.carregarComentarios();
    }
  }

  iniciarAprovado(comentario: TipoComentario) {
    this.comentarioParaAprovar = comentario;
    this.postService
      .obterPost(comentario.postId)
      .pipe(
        this.toast.observe({
          error: 'Erro ao buscar o post relacionado',
        }),
      )
      .subscribe({
        next: (post) => {
          this.titulorPostEditar = post.titulo;
        },
      });
  }

  aprovarComentario() {
    if (!this.comentarioParaAprovar?.id) {
      return;
    }
    this.comentariosService
      .aprovarComentario(this.comentarioParaAprovar.id)
      .pipe(
        this.toast.observe({
          success: 'Comentário aprovado com sucesso',
          error: 'Erro ao aprovar comentario',
          loading: 'Aprovando...',
        }),
      )
      .subscribe({
        next: () => {
          this.carregarComentarios();
          this.fecharModais();
        },
      });
  }

  fecharModais() {
    this.comentarioParaAprovar = null;
    this.comentarioParaExcluir = null;
    this.titulorPostEditar = null;
  }
}
