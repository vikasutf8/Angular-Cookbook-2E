import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@codewithahsan/ng-cb-ui';
import { todoStore } from './store/todos.store';
import { FormsModule } from '@angular/forms';
import { single } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [FormsModule, HeaderComponent, CommonModule, RouterModule, HeaderComponent],
})
export class AppComponent {
 // their all todo items rendered from todos.store.ts
 store =inject(todoStore);

 newTodoTitle =signal(''); //create to getting frontend input 

 submitNewTodo(){
  this.store.addTodo(this.newTodoTitle()); //on submit frontend todo added in store array
  this.newTodoTitle.set(''); //empty the input field
 }
}
