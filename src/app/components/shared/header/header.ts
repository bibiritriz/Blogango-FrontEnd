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
    // Exemplo para testar toast
    this.comentarioService
      .obterComentarios('693218d7c5573ca6d33b0e12')
      .pipe(
        this.toast.observe({
          success: 'Sucesso',
          loading: 'Carregando',
          error: 'Erro',
        }),
      )
      .subscribe();
  }
}
