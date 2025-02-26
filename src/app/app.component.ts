import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SunriseComponent } from './components/sunrise/sunrise.component';
import { PageComponent } from './components/page/page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SunriseComponent, PageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ng-night-app';
}
