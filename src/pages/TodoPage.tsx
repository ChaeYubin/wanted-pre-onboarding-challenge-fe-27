import { useEffect, useState } from 'react';

import { getTodos } from '@/api/todo';
import TodoDetail from '@/components/TodoDetail';
import TodoList from '@/components/TodoList';
import { TodoItem } from '@/types/todo';
import { getToken } from '@/utils/localStorage';

const TodoPage = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);

  useEffect(() => {
    const getTodoList = async () => {
      const response = await getTodos(getToken());
      if (response instanceof Error) {
        console.error(response.message);
        alert(response.message);
        return;
      } else {
        setTodoList(response);
      }
    };

    if (getToken()) {
      getTodoList();
    }
  }, []);

  return (
    <>
      <div className="grid justify-items-stretch grid-cols-2 pt-8 gap-3">
        <TodoList todoList={todoList} setTodoList={setTodoList} selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />
        <TodoDetail todoList={todoList} setTodoList={setTodoList} selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />
      </div>
    </>
  );
};

export default TodoPage;
