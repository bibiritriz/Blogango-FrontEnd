import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/shared/header/header';
import { FloatingMenu } from '../../components/shared/floating-menu/floating-menu';

@Component({
  selector: 'app-main-layout',
  imports: [HeaderComponent, RouterOutlet, FloatingMenu],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}
