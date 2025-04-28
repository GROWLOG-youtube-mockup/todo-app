import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTodoStore = create(
  persist((set, get) => ({
    todos: [],

    addTodo: ({ id, title, description, isComplete, priority }) => {
      const newTodo = {
        /* TODO: 추후 mock data 필요없을 때 수정해야 함 */
        id: id || Date.now(),
        title,
        description,
        saveAt: new Date().toISOString(),
        isComplete,
        priority
      };
      set({ todos: [...get().todos, newTodo] });
    },

    // 기존 할 일 수정
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

    // 할 일 삭제
    removeTodo: (id) => {
      set({ todos: get().todos.filter((todo) => todo.id !== id) });
    },

    // 전체 초기화
    resetTodos: () => {
      set({ todos: [] });
    }
  }))
);
