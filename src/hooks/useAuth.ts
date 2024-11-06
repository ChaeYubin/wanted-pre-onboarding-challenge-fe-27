import { useNavigate } from 'react-router-dom';

import { getToken, setToken } from '@/utils/localStorage';
import { login as loginApi, signUp as signUpApi } from '@/api/auth';

export const useAuth = () => {
  const navigate = useNavigate();

  const isLoggedIn = getToken() ? true : false;

  const login = async (email: string, password: string, href: string) => {
    const response = await loginApi({ email, password });

    if (response instanceof Error) {
      console.error(response.message);
      alert(response.message);
      return;
    }

    if (response && response.token) {
      setToken(response.token);
      navigate(href);
    } else {
      console.error(response.message);
    }
  };

  const signUp = async (email: string, password: string, href?: string) => {
    const response = await signUpApi({ email, password });

    if (response instanceof Error) {
      console.error(response.message);
      alert(response.message);
      return;
    }

    if (response && response.token) {
      alert('회원가입이 완료되었습니다. 로그인 해주세요.');
      if (href) {
        navigate(href);
      }
    } else {
      console.error(response.message);
    }
  };

  return { isLoggedIn, login, signUp };
};
