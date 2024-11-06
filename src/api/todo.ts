import { DeleteTodoParams, UpdateTodoParams } from './../types/todo';
import axiosInstance from '../lib/axiosInstance';
import { CreateTodoParams, TodoItem } from '@/types/todo';

export const getTodos = async (token: string): Promise<TodoItem[] | Error> => {
  try {
    const response = await axiosInstance.get('/todos', {
      headers: {
        Authorization: token,
      },
    });

    return response.data.data;
  } catch (err: any) {
    return new Error(err.response?.data?.details || '투두리스트 조회 오류가 발생했습니다.');
  }
};

export const getTodoById = async (token: string, id: string): Promise<TodoItem | Error> => {
  try {
    const response = await axiosInstance.get(`/todos/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    return response.data.data;
  } catch (err: any) {
    return new Error(err.response?.data?.details || '투두리스트 조회 오류가 발생했습니다.');
  }
};

export const createTodo = async ({ title, content, token }: CreateTodoParams): Promise<TodoItem | Error> => {
  try {
    const response = await axiosInstance.post(
      '/todos',
      { title, content },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return response.data.data;
  } catch (err: any) {
    return new Error(err.response?.data?.details || '투두 생성 오류가 발생했습니다.');
  }
};

export const updateTodo = async ({ title, content, id, token }: UpdateTodoParams): Promise<TodoItem | Error> => {
  try {
    const response = await axiosInstance.put(
      `/todos/${id}`,
      { title, content },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return response.data.data;
  } catch (err: any) {
    return new Error(err.response?.data?.details || '투두 수정 오류가 발생했습니다.');
  }
};

export const deleteTodo = async ({ id, token }: DeleteTodoParams): Promise<{ data: null } | Error> => {
  try {
    const response = await axiosInstance.delete(`/todos/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data.data;
  } catch (err: any) {
    return new Error(err.response?.data?.details || '투두 삭제 오류가 발생했습니다.');
  }
};
