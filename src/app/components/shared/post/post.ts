import { Component } from '@angular/core';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class PostComponent {
  titulo = 'Tutorial de Spring Boot com MongoDB';

  data = '04/12/2025';

  autor = 'Autor';

  conteudo = 'Este é um conteúdo de teste criado para validar a restrição de no míni…';

  categorias = ['Java', 'Spring Boot', 'MongoDB'];
}
