export interface TodoItem {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type GetTodoByIdParams = Pick<TodoItem, 'id'> & { token: string };
export type CreateTodoParams = Pick<TodoItem, 'title' | 'content'> & { token: string };
export type UpdateTodoParams = Pick<TodoItem, 'title' | 'content' | 'id'> & { token: string };
export type DeleteTodoParams = Pick<TodoItem, 'id'> & { token: string };
