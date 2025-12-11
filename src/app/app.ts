import { Component, signal } from '@angular/core';
import { HeaderComponent } from './components/shared/header/header';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('blogango-frontend');
}
