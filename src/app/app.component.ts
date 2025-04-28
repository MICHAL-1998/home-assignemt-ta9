import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemsListComponent } from './components/items-list/items-list.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [ItemsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'home-assignment';
}
