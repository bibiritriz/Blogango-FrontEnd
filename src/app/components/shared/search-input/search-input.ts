import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  imports: [FormsModule],
  templateUrl: './search-input.html',
  styleUrl: './search-input.css',
})
export class SearchInput {
  @Output() termoParaBusca = new EventEmitter<string>();

  valorBusca: string = '';

  emitirBusca(): void {
    this.termoParaBusca.emit(this.valorBusca);
  }
}
