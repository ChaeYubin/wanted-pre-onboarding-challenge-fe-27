import TodoList from '@/components/TodoList';
import { Outlet } from 'react-router-dom';

const TodoPage = () => {
  return (
    <div className="grid justify-items-stretch grid-cols-2 mt-16 gap-3 h-[500px]">
      <TodoList />
      <Outlet />
    </div>
  );
};

export default TodoPage;
