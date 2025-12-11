import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalWraper } from '../modal-wraper/modal-wraper';

@Component({
  selector: 'app-confirm-modal',
  imports: [ModalWraper],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css',
})
export class ConfirmModal {
  @Input() titulo = 'Confirmar Exclusão';

  @Input({ required: true }) mensagem!: string;

  @Output() confirmar = new EventEmitter<void>();

  @Output() cancelar = new EventEmitter<void>();
}
