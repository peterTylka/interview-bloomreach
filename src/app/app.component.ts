import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FunnelFormComponent } from './components';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, FunnelFormComponent],
})
export class AppComponent {
  title = 'bloomreach-funnel';
}
