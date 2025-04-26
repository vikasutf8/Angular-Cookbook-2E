import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@codewithahsan/ng-cb-ui';
import { todoStore } from './store/todos.store';
import { FormsModule } from '@angular/forms';
import { single } from 'rxjs';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    SnackbarComponent,
    FormsModule, HeaderComponent, CommonModule, RouterModule, HeaderComponent],
})
export class AppComponent {
 // their all todo items rendered from todos.store.ts
 store =inject(todoStore);

 newTodoTitle =signal(''); //create to getting frontend input 
snackbar =viewChild.required(SnackbarComponent);

constructor() {
  console.log('app component');
  effect(()=>{
    if(this.store.todos().every((todo)=>todo.completed)){
      this.snackbar().show();
    }
  })
}

 submitNewTodo(){
  this.store.addTodo(this.newTodoTitle()); //on submit frontend todo added in store array
  this.newTodoTitle.set(''); //empty the input field
 }
}
