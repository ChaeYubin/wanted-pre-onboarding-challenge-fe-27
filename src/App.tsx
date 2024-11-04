import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AuthPage from './pages/AuthPage';
import TodoPage from './pages/TodoPage';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route index element={<TodoPage />} />
        <Route path="/auth" element={<AuthPage />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
