import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { TodoItem } from './todos.model';

//this  state having array of todo items that i defined in todos.model.ts
type TodoState ={
    todos :TodoItem[] ;
}

const initialState :TodoState = {
    todos : [ ]
}

export const todoStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),

    //needs method to add todo item
    withMethods((store)=>({
        //what I doing : pass a sting as argment as todo title and stored that new title in above array of todos on pass new and defactored old once
        addTodo(newTodoTitle :string) {
            patchState(store,{
                todos:[
                    {
                        title : newTodoTitle,
                        id : Math.random().toString(36).substring(2, 9),
                        completed : false
                    },
                    ...store.todos(),
                ]
            })
        },

        toggleTodo(todo_id :string) {
            patchState(store, {
                todos: store.todos().map((todo) => {
                    if (todo.id === todo_id) {
                        return {
                            ...todo,
                            completed: !todo.completed,
                        };
                    }
                    return todo;
                }),
            });
        },
    }))

);
//how to know other file that i am using this store ??
// - provide it in app.module.ts/app.component.ts
// - this store option in root module --erery component access this store

