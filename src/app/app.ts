import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/header/header';
import { Post } from './components/shared/post/post';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, Post],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('blogango-frontend');
}
