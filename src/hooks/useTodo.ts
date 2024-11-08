import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { GetTodoByIdParams, TodoItem, UpdateTodoParams } from '@/types/todo';
import { createTodo, deleteTodo, getTodoById, getTodos, updateTodo } from '@/api/todo';
import { CreateTodoParams, DeleteTodoParams } from '@/types/todo';

export const useGetTodos = (token: string) =>
  useQuery<TodoItem[]>({
    queryKey: ['todos'],
    queryFn: () => getTodos(token),
    staleTime: 1000 * 60 * 5,
  });

export const useGetTodoById = ({ id, token }: GetTodoByIdParams) =>
  useQuery<TodoItem>({
    queryKey: [{ todoId: id }],
    queryFn: () => getTodoById({ id, token: token }),
    staleTime: 1000 * 60 * 5,
  });

export const useCreateTodo = ({ token }: Pick<CreateTodoParams, 'token'>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ title, content }: Omit<CreateTodoParams, 'token'>) => createTodo({ title, content, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useUpdateTodo = ({ id, token }: Pick<UpdateTodoParams, 'id' | 'token'>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ title, content }: Omit<UpdateTodoParams, 'id' | 'token'>) => updateTodo({ id, title, content, token }),
    onSuccess: (data) => {
      queryClient.setQueryData([{ todoId: id }], data);
    },
  });
};

export const useDeleteTodo = ({ id, token, redirectTo }: DeleteTodoParams & { redirectTo: string }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteTodo({ id, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.removeQueries({ queryKey: [{ todoId: id }] });
      navigate(redirectTo);
    },
  });
};
