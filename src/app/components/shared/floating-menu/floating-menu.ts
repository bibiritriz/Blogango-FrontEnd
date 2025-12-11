import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-floating-menu',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './floating-menu.html',
  styleUrl: './floating-menu.css',
})
export class FloatingMenu {}
