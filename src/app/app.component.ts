import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'Aula1';

  list: Courses[] = [
    { name: 'Control Flow', path: 'https://angular.io/guide/control_flow' },
    { name: 'Deferable Views', path: 'https://angular.io/guide/defer' },
  ];
}

interface Courses {
  name: string;
  path: string;
}
