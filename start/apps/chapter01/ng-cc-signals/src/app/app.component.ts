import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@codewithahsan/ng-cb-ui';
import { todoStore } from './store/todos.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterModule, HeaderComponent],
})
export class AppComponent {
 // their all todo items rendered from todos.store.ts
 store =inject(todoStore);
}
