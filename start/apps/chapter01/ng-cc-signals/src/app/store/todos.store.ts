import { getState, patchState, signalStore, watchState, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';

import { TodoItem } from './todos.model';
import { computed, effect } from '@angular/core';
import { filter } from 'rxjs';

//this  state having array of todo items that i defined in todos.model.ts
const ngrxStorekeu ="jfahsdkflksa;fasdf";
type todoFilter ='all' | 'active' | 'completed';
type TodoState ={
    todos :TodoItem[] ;
    filter:todoFilter;
}

const initialState :TodoState = {
    todos : [ ],
    filter : 'all'

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

        changeFilter(filter :todoFilter) {
            patchState(store, {filter})
        }

        
    })),

    withComputed((store)=>({
        //also use .length()at end for count only ..now it returns array of todos
        completedTodos :computed(() => 
           store.todos().filter((todo)=>{
            return todo.completed;
           })
        ),
//first we changed filter and on based we completed property of todoitem render listing 
        filteredTodos :computed(() => {
            switch (store.filter()) {
                case 'active':
                    return store.todos().filter((todo)=>{
                        return !todo.completed;
                    })
                case 'completed':
                    return store.todos().filter((todo)=>{
                        return todo.completed;
                    })
                default:
                    return store.todos(); //this is main list
            }
        }),

    })),

    withHooks({
        //this is initial state :keeping store
        onInit(store) {
            const todosForStore = JSON.parse(localStorage.getItem(ngrxStorekeu) || '[]');
//getting data from local storage and set it main storage arrya 
            console.log('onInit',todosForStore)
            patchState(store, {
                todos: todosForStore,
            });
            effect(()=>{
                const state =getState(store)  //this is not signal it plain object
                console.log('effect changed',state)
                localStorage.setItem(ngrxStorekeu,JSON.stringify(state.todos))
            })
            // watchState(store, ({todos}) => {
            //     // console.log('store changed',state);
            //     localStorage.setItem(ngrxStorekeu,JSON.stringify(todos))

            // });
        },
    })

);
//how to know other file that i am using this store ??
// - provide it in app.module.ts/app.component.ts
// - this store option in root module --erery component access this store

//why we getting store change before effect changed : watchstate run before ,then effect: effect combined all states changes before it run and show effects

