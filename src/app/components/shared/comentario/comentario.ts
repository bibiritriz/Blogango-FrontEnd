import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Comentario as TipoComentario } from '../../../models/comentario.model';

@Component({
  selector: 'app-comentario',
  imports: [DatePipe],
  templateUrl: './comentario.html',
  styleUrl: './comentario.css',
})
export class Comentario {
  @Input({ required: true }) comentario!: TipoComentario;

  @Output() editar = new EventEmitter<void>();

  @Output() excluir = new EventEmitter<void>();
}
