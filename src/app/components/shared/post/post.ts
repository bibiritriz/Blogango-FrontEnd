import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-post',
  imports: [DatePipe],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class PostComponent {
  @Input() post!: Post;
}
