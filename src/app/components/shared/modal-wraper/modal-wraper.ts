import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-wraper',
  imports: [],
  templateUrl: './modal-wraper.html',
  styleUrl: './modal-wraper.css',
})
export class ModalWraper {
  @Input({ required: true }) titulo!: string;

  @Output() fechar = new EventEmitter<void>();
}
