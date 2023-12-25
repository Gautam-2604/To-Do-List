import { createContext, useContext } from "react";

export const ToDoContext = createContext({
    todos: [
        {
            id:1,
            todo: "todomsg",
            completed: false
        }
    ],
    addToDo: (todo)=>{},
    updataToDo: (id, todo)=>{},
    deleteToDo: (id)=>{},
    toggleComplete: (id)=>{}

})

export const useToDo = ()=>{
    return useContext(ToDoContext)
}

export const ToDoProvider= ToDoContext.Provider