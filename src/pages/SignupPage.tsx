import { signUp } from '@/api/auth';
import { validateEmail, validatePassword } from '@/utils/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignup = async () => {
    const response = await signUp({ email, password });

    if (response instanceof Error) {
      console.error(response.message);
      alert(response.message);
      return;
    }

    if (response && response.token) {
      alert('회원가입이 완료되었습니다. 로그인 해주세요.');
      navigate('/auth/login');
    } else {
      console.error(response.message);
    }
  };

  return (
    <>
      <h2>회원가입</h2>
      <div>
        <input type="email" placeholder="이메일을 입력해주세요." value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="비밀번호를 입력해주세요." value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="button" onClick={handleSignup} disabled={!validateEmail(email) || !validatePassword(password)}>
          회원가입
        </button>
      </div>
    </>
  );
};

export default SignupPage;
