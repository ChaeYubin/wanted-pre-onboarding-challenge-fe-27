import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useLogout, useSelectIsLoggedIn } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import AlertModal from '@/components/common/AlertModal';

const MainPage = () => {
  const isLoggedIn = useSelectIsLoggedIn();
  const logout = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/todo');
    } else {
      navigate('/auth');
    }
  }, [isLoggedIn]);

  return (
    <div className="mx-auto p-16 mt-8 max-w-4xl">
      <div className="flex items-center">
        <h1 className="text-5xl font-bold mb-3">Todo List</h1>
        {isLoggedIn && (
          <AlertModal title="로그아웃 하시겠어요?" confirmButtonText="로그아웃" onConfirm={logout}>
            <Button type="button" className="ml-auto">
              로그아웃
            </Button>
          </AlertModal>
        )}
      </div>
      <p className="text-sm text-gray-600">할 일을 추가하고, 수정하고, 삭제할 수 있습니다.</p>
      <p className="text-sm text-gray-600">할 일을 체계적으로 관리하고 완료해보세요!</p>

      <Outlet />
    </div>
  );
};

export default MainPage;
