import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaDePosts } from './pages/lista-de-posts/lista-de-posts';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListaDePosts],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('blogango-frontend');
}
