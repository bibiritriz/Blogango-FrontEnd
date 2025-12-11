import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioPost } from './components/shared/formulario/formulario';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormularioPost],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('blogango-frontend');
}
