import { Outlet } from 'react-router-dom';

import { useSelectIsLoggedIn } from '@/store/authStore';
import TodoList from '@/components/todo/TodoList';

const TodoPage = () => {
  const isLoggedIn = useSelectIsLoggedIn();

  return (
    <div className="grid justify-items-stretch grid-cols-2 mt-16 gap-3 h-[500px]">
      {!isLoggedIn ? (
        <p className="text-center col-span-2">로그인이 필요합니다.</p>
      ) : (
        <>
          <TodoList />
          <Outlet />
        </>
      )}
    </div>
  );
};

export default TodoPage;
