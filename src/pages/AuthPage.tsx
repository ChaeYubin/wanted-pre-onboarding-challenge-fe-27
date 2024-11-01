import useAuth from '@/hooks/useAuth';
import { Link, Outlet } from 'react-router-dom';

const AuthPage = () => {
  useAuth();

  return (
    <>
      <li>
        <Link to="/auth/login">로그인</Link>
      </li>
      <li>
        <Link to="/auth/signup">회원가입</Link>
      </li>
      <Outlet />
    </>
  );
};

export default AuthPage;
