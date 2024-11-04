import { Outlet } from 'react-router-dom';

const MainPage = () => {
  return (
    <div className="mx-auto p-16 max-w-4xl">
      <h1 className="text-4xl font-bold">Todo List</h1>
      <Outlet />
    </div>
  );
};

export default MainPage;
