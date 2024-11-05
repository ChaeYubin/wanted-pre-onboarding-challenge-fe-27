import { getToken } from '@/utils/localStorage';
import { Outlet } from 'react-router-dom';

const MainPage = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <div className="mx-auto p-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-3">Todo List</h1>
      {getToken() && (
        <button type="button" className="border rounded-lg py-1 px-2" onClick={handleLogout}>
          로그아웃
        </button>
      )}

      <Outlet />
    </div>
  );
};

export default MainPage;
