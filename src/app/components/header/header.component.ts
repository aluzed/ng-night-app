import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { gameOwl } from '@ng-icons/game-icons';

@Component({
  selector: 'app-header',
  imports: [NgIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [provideIcons({ gameOwl })],
})
export class HeaderComponent {}
