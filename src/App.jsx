import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToDoProvider } from './context'
import { useEffect } from 'react'
import { TodoForm, TodoItem } from './components'

function App() {
  const [todos, setToDos] = useState([])

  const addToDo = (todo)=>{
    setToDos((prev)=>[{id : Date.now(), ...todo},...prev])
  }

  const updateToDo = (id, todo)=>{
    setToDos((prev)=>prev.map((prevToDo)=> (prevToDo.id===id ? todo : prevToDo)))
  }

  const deleteToDo = (id)=>{
    setToDos((prev)=>prev.filter((todo) =>todo.id !== id))
  }

  const toggleComplete = (id)=>{
    setToDos((prev)=>prev.map((prevToDo)=>prevToDo.id === id ? {...prevToDo, completed : !prevToDo.completed}:prevToDo ))
  }

  //Local Storage access function
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setToDos(todos)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])
    
  
  return (
    <ToDoProvider value={{todos, addToDo, updateToDo, deleteToDo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <ToDoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=>(
                          <div key={todo.id} className='w-full'>
                              <ToDoItem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </ToDoProvider>
  )
}

export default App
