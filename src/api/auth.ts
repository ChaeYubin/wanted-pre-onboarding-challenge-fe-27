import { AuthResponse, LoginInfo, SignUpInfo } from '@/types/auth';
import axiosInstance from '../lib/axiosInstance';

export const signUp = async ({ email, password }: SignUpInfo): Promise<AuthResponse | Error> => {
  try {
    const response = await axiosInstance.post('/users/create', { email: email, password: password });
    return response.data;
  } catch (err: any) {
    return new Error(err.response?.data?.details || '회원가입 오류가 발생했습니다.');
  }
};

export const login = async ({ email, password }: LoginInfo): Promise<AuthResponse | Error> => {
  try {
    const response = await axiosInstance.post('/users/login', { email: email, password: password });
    return response.data;
  } catch (err: any) {
    return new Error(err.response?.data?.details || '로그인 오류가 발생했습니다.');
  }
};
