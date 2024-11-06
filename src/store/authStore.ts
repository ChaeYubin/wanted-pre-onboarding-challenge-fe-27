import { create } from 'zustand';

import { getToken, setToken, removeToken } from '@/utils/localStorage';
import { login as loginApi, signUp as signUpApi } from '@/api/auth';

interface AuthStore {
  isLoggedIn: boolean;
  actions: {
    login: (email: string, password: string) => void;
    signUp: (email: string, password: string) => void;
    logout: () => void;
  };
}

const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: Boolean(getToken()),

  actions: {
    login: async (email, password) => {
      const response = await loginApi({ email, password });

      if (response instanceof Error) {
        console.error(response.message);
        alert(response.message);
        return;
      }

      if (response && response.token) {
        setToken(response.token);
        set({ isLoggedIn: true });
      } else {
        console.error(response.message);
      }
    },

    signUp: async (email, password) => {
      const response = await signUpApi({ email, password });

      if (response instanceof Error) {
        console.error(response.message);
        alert(response.message);
        return;
      }

      if (response && response.token) {
        alert('회원가입이 완료되었습니다. 로그인 해주세요.');
      } else {
        console.error(response.message);
      }
    },

    logout: () => {
      removeToken();
      set({ isLoggedIn: false });
    },
  },
}));

export const useSelectIsLoggedIn = () => useAuthStore((state) => state.isLoggedIn);
export const useLogin = () => useAuthStore((state) => state.actions.login);
export const useSignUp = () => useAuthStore((state) => state.actions.signUp);
export const useLogout = () => useAuthStore((state) => state.actions.logout);
