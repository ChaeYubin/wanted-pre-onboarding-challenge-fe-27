import { Outlet, useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

const MainPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate('/todo');
  } else {
    navigate('/auth');
  }

  return (
    <div className="mx-auto p-16 mt-8 max-w-4xl">
      <h1 className="text-5xl font-bold mb-3">Todo List</h1>
      <p className="text-sm text-gray-600">할 일을 추가하고, 수정하고, 삭제할 수 있습니다.</p>
      <p className="text-sm text-gray-600">해야 할 일을 체계적으로 관리하고 하나씩 지워나가보세요!</p>

      <Outlet />
    </div>
  );
};

export default MainPage;
