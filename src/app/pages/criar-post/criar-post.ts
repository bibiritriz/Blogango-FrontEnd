import { Component } from '@angular/core';
import { FormularioPost } from '../../components/shared/formulario/formulario';

@Component({
  selector: 'app-criar-post',
  imports: [FormularioPost],
  templateUrl: './criar-post.html',
  styleUrl: './criar-post.css',
})
export class CriarPost {}
