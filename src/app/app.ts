import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/header/header';
import { PostComponent } from './components/shared/post/post';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, PostComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('blogango-frontend');
}
