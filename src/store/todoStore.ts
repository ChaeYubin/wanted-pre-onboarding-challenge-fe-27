import { create } from 'zustand';

import { createTodo as createTodoApi, deleteTodo as deleteTodoApi, getTodoById, getTodos, updateTodo as updateTodoApi } from '@/api/todo';
import { TodoItem } from '@/types/todo';
import { getToken } from '@/utils/localStorage';

interface TodoStore {
  todos: TodoItem[];
  selectedTodo: TodoItem | null;

  actions: {
    getTodos: () => void;
    getTodoById: (id: string) => void;
    createTodo: (title: string, content: string) => void;
    updateTodo: (id: string, title: string, content: string) => void;
    deleteTodo: (id: string) => void;
  };
}

const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  selectedTodo: null,

  actions: {
    getTodos: async () => {
      const response = await getTodos(getToken());
      if (response instanceof Error) {
        console.error(response.message);
        alert(response.message);
        return;
      } else {
        set({ todos: response });
      }
    },

    createTodo: async (title: string, content: string) => {
      const response = await createTodoApi({ title, content, token: getToken() });

      if (response instanceof Error) {
        console.error(response.message);
        alert(response.message);
        return;
      } else {
        set((state) => ({ todos: [...state.todos, response], selectedTodo: response }));
      }
    },

    updateTodo: async (id: string, title: string, content: string) => {
      const response = await updateTodoApi({ id, title, content, token: getToken() });

      if (response instanceof Error) {
        console.error(response.message);
        alert(response.message);
        return;
      } else {
        set((state) => ({
          todos: state.todos.map((todo) => {
            if (todo.id === id) {
              return { ...todo, title: title, content: content };
            } else {
              return todo;
            }
          }),
        }));

        set((state) => ({ selectedTodo: state.todos.find((todo) => todo.id === id) }));
      }
    },

    deleteTodo: async (id: string) => {
      const response = await deleteTodoApi({ id, token: getToken() });

      if (response instanceof Error) {
        console.error(response.message);
        alert(response.message);
        return;
      } else {
        set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id), selectedTodo: null }));
      }
    },

    getTodoById: async (id: string) => {
      const response = await getTodoById({ id, token: getToken() });

      if (response instanceof Error) {
        console.error(response.message);
        alert(response.message);
        return;
      } else {
        set({ selectedTodo: response });
      }
    },
  },
}));

export const useSelectTodos = () => useTodoStore((state) => state.todos);
export const useSelectSelectedTodo = () => useTodoStore((state) => state.selectedTodo);

export const useGetTodos = () => useTodoStore((state) => state.actions.getTodos);
export const useGetTodoById = () => useTodoStore((state) => state.actions.getTodoById);
export const useCreateTodo = () => useTodoStore((state) => state.actions.createTodo);
export const useUpdateTodo = () => useTodoStore((state) => state.actions.updateTodo);
export const useDeleteTodo = () => useTodoStore((state) => state.actions.deleteTodo);
