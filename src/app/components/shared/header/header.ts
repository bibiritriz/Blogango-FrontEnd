import { Component, inject, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { ComentarioService } from '../../../services/comentario/comentario.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent implements OnInit {
  private comentarioService = inject(ComentarioService);

  private toast = inject(HotToastService);

  ngOnInit() {
    this.comentarioService
      .obterComentario('6932e9257c45df880ac69186')
      .pipe(
        this.toast.observe({
          loading: 'Carregando...',
          success: 'Excluindo com sucesso',
          error: 'Error',
        }),
      )
      .subscribe();
  }
}
