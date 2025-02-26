import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-page',
  imports: [HeaderComponent, PlayerComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent {}
