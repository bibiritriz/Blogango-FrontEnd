import { Component, inject, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-post',
  imports: [DatePipe],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class PostComponent {
  @Input() post!: Post;

  private router = inject(Router);

  abrirPost() {
    this.router.navigate(['/post', this.post.id]);
  }
}
