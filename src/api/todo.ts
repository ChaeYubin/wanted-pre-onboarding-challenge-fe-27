import axiosInstance from '@/lib/axiosInstance';
import { CreateTodoParams, GetTodoByIdParams, DeleteTodoParams, UpdateTodoParams } from '@/types/todo';

export const getTodos = (token: string) =>
  axiosInstance
    .get('/todos', {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => response.data.data);

export const getTodoById = ({ id, token }: GetTodoByIdParams) =>
  axiosInstance
    .get(`/todos/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => response.data.data);

export const createTodo = ({ title, content, token }: CreateTodoParams) =>
  axiosInstance
    .post(
      '/todos',
      { title, content },
      {
        headers: {
          Authorization: token,
        },
      },
    )
    .then((response) => response.data.data);

export const updateTodo = ({ id, title, content, token }: UpdateTodoParams) =>
  axiosInstance
    .put(
      `/todos/${id}`,
      { title, content },
      {
        headers: {
          Authorization: token,
        },
      },
    )
    .then((response) => response.data.data);

export const deleteTodo = ({ id, token }: DeleteTodoParams) =>
  axiosInstance
    .delete(`/todos/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => response.data.data);
