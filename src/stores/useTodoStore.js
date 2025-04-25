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
    }
  }))
);
