import { Todo } from "@/app/types/todo";

const todos: Todo[] = [];

export const addTodo = (todo: Omit<Todo, 'id'>): Todo => {
    const newTodo: Todo = {
        id: Date.now(),
        ...todo
    };

    todos.push(newTodo);
    return newTodo;
};

export const getTodo = (): Todo[] => {
    return [...todos];
};

export const completeTodo = (id: number): Todo | null => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
        return null;
    }
    
    todos[todoIndex].is_complete = !todos[todoIndex].is_complete;
    return todos[todoIndex];
};

export const deleteTodo = (id: number): Todo | null => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
        return null;
    }
    
    const deletedTodo = todos[todoIndex];
    todos.splice(todoIndex, 1);
    return deletedTodo;
};