import { Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import TodoPage from './pages/TodoPage';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/todo" element={<TodoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
