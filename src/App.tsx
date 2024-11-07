import { Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import TodoPage from './pages/TodoPage';
import './index.css';
import TodoDetail from './components/TodoDetail';
import EditTodo from './components/EditTodo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/todo" element={<TodoPage />}>
          <Route path=":todoId" element={<TodoDetail />} />
          <Route path=":todoId/edit" element={<EditTodo />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
