import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTodoStore = create(
  persist((set, get) => ({
    todos: [],

    // 기존 addTodo 그대로 유지 (로컬 생성용)
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

    // 원격(server)에서 받아온 todo를 로컬 state에 추가하는 액션
    addTodoRemote: (todo) => {
      set({ todos: [...get().todos, todo] });
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
    },

    removeTodo: (id) => {
      set({ todos: get().todos.filter((todo) => todo.id !== id) });
    },

    resetTodos: () => {
      set({ todos: [] });
    }
  }))
);
