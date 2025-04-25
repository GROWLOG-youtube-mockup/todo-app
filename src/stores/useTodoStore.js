import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTodoStore = create(
  persist((set, get) => ({
    todos: [],

    addTodo: ({ title, description, isComplete, priority }) => {
      const newTodo = {
        id: Date.now(),
        title,
        description,
        saveAt: new Date().toISOString(),
        isComplete,
        priority
      };
      set({ todos: [...get().todos, newTodo] });
    },

    updateTodo: ({ id, title, description, isComplete, priority }) => {
      const updatedTodos = get().todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              ...(title !== undefined && { title }),
              ...(description !== undefined && { description }),
              ...(isComplete !== undefined && { isComplete }),
              ...(priority !== undefined && { priority })
            }
          : todo
      );
      set({ todos: updatedTodos });
    }
  }))
);
