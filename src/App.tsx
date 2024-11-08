import { Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import TodoPage from './pages/TodoPage';
import './index.css';
import { queryClient } from './lib/reactQueryProvider';
import TodoDetail from './components/todo/TodoDetail';
import EditTodo from './components/todo/EditTodo';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/todo" element={<TodoPage />}>
            <Route path=":todoId" element={<TodoDetail />} />
            <Route path=":todoId/edit" element={<EditTodo />} />
          </Route>
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
