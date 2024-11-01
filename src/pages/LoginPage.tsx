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
    <>
      <h2>로그인</h2>
      <div>
        <input type="email" placeholder="이메일을 입력해주세요." value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="비밀번호를 입력해주세요." value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="button" disabled={!validateEmail(email) || !validatePassword(password)} onClick={handleLogin}>
          로그인
        </button>
      </div>
    </>
  );
};

export default LoginPage;
