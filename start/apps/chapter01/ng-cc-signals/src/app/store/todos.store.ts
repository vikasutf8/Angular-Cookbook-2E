import { signalStore, withState } from '@ngrx/signals';

import { TodoItem } from './todos.model';

//this  state having array of todo items that i defined in todos.model.ts
type TodoState ={
    todos :TodoItem[] ;
}

const initialState :TodoState = {
    todos : [
        {
            id : '1',
            title : 'Buy milk',
            completed : false
        },
        {
            id : '2',
            title : 'Buy bread',
            completed : false
        },
        {
            id : '3',
            title : 'Buy apples',
            completed : false
        }
    ]
}

export const todoStore = signalStore(
    {providedIn: 'root'},``
    withState(initialState),
);
//how to know other file that i am using this store ??
// - provide it in app.module.ts/app.component.ts
// - this store option in root module --erery component access this store

