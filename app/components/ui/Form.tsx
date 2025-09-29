"use client"
import { getTodo, addTodo, completeTodo, deleteTodo } from '@/app/utils/todo';
import { Todo } from '@/app/types/todo';
import { useState } from 'react'
import clsx from 'clsx';

function Form() {  
  const [input, setInput] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>(getTodo());

  const handleAddTodo = (): void => {
    if (input.trim()) {
      addTodo({
        task: input,
        is_complete: false
      });
      setTodos(getTodo());
      setInput('');
    }
  };

  const handleComplete = (id: number): void => {
    const updatedTodo = completeTodo(id);
    if (updatedTodo) {
      setTodos(getTodo());
    }
  };

  const handleDelete = (id: number): void => {
    const deletedTodo = deleteTodo(id);
    if (deletedTodo) {
      setTodos(getTodo());
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(event.target.value);
  };
  return (
    <div className='p-5 flex flex-col justify-center pt-[8rem]'>
        <div className='mx-auto px-4
                        sm:max-w-[540px]
                        md:max-w-[720px]
                        lg:max-w-[960px]
                        xl:max-w-[1140px]
                        2xl:max-w-[1320px]'>
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            <form>
            <input 
                type="text" 
                name="todo" 
                id="todo" 
                value={input} 
                onChange={handleChange} 
                placeholder='Enter a task.'
                className='border border-[#cccccc] focus:outline-none focus:ring-0 w-full px-3 py-2 rounded'
            />
            <button type='button' onClick={handleAddTodo} className='bg-blue-300 text-blue-700 w-full rounded p-2 mt-1 hover:cursor-pointer hover:bg-blue-200'>Add Todo</button>
            </form>
        </div>

        <div className="mt-4 flex justify-center">
            <ul className="w-full max-w-[20rem]">
                {todos.map((todo) => (
                <li
                    key={todo.id}
                    className="flex justify-between w-full mb-2 p-2"
                >
                    <p className={clsx(todo.is_complete && 'line-through')}>{todo.task}</p>
                    <span className="flex gap-2">                    <button 
                      onClick={() => handleComplete(todo.id)}
                      className={clsx(
                            'border border-[#cccccc] px-2 hover:cursor-pointer',
                            todo.is_complete
                            ? 'bg-gray-300 text-gray-700'
                            : 'bg-green-300 text-green-700'
                    )}                    >{todo.is_complete ? 'Unfinish' : 'Finish'}</button>
                    <button 
                      onClick={() => handleDelete(todo.id)}
                      className="border border-[#cccccc] hover:cursor-pointer bg-red-300 text-red-700 px-2"
                    >Delete</button>
                    </span>
                </li>
                ))}
            </ul>
        </div>

    </div>
  )
}

export default Form
