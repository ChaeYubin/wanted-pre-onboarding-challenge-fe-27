import { login } from '@/api/auth';
import { validateEmail, validatePassword } from '@/utils/auth';
import { storage } from '@/utils/localStorage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    const response = await login({ email, password });

    if (response instanceof Error) {
      console.error(response.message);
      alert(response.message);
      return;
    }

    if (response && response.token) {
      storage.set('token', response.token);
      navigate('/');
    } else {
      console.error(response.message);
    }
  };

  return (
    <div className="mt-3">
      <h2 className="text-2xl font-extrabold">로그인</h2>
      <div className="flex space-x-2 mt-3">
        <input type="email" placeholder="이메일을 입력해주세요." value={email} onChange={(e) => setEmail(e.target.value)} className="border py-1 px-2 rounded-md" />
        <input type="password" placeholder="비밀번호를 입력해주세요." value={password} onChange={(e) => setPassword(e.target.value)} className="border py-1 px-2 rounded-md" />
        <button type="button" disabled={!validateEmail(email) || !validatePassword(password)} onClick={handleLogin}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
