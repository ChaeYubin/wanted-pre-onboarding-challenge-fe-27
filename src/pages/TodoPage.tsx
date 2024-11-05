import { getTodos } from '@/api/todo';
import LogoutButton from '@/components/LogoutButton';
import TodoDetail from '@/components/TodoDetail';
import TodoList from '@/components/TodoList';
import { TodoItem } from '@/types/todo';
import { getToken } from '@/utils/localStorage';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TodoPage = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);

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

  useEffect(() => {
    if (getToken()) {
      getTodoList();
    }
  }, []);

  return getToken() ? (
    <>
      <LogoutButton />
      <div className="grid justify-items-stretch grid-cols-2 pt-8 gap-3">
        <TodoList todoList={todoList} setTodoList={setTodoList} selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />
        <TodoDetail todoList={todoList} setTodoList={setTodoList} selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />
      </div>
    </>
  ) : (
    <>
      <Link to="/auth/login">로그인하러 가기 →</Link>
    </>
  );
};

export default TodoPage;
