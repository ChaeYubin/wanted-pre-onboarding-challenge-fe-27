import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validateEmail, validatePassword } from '@/utils/auth';
import { useAuth } from '@/hooks/useAuth';

const AuthPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, login, signUp } = useAuth();

  if (isLoggedIn) {
    navigate('/todo');
  }

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <div className="mt-16">
      <Tabs defaultValue="account" className="w-[400px] mx-auto">
        <TabsList
          className="grid w-full grid-cols-2"
          onClick={() => {
            setEmail('');
            setPassword('');
          }}
        >
          <TabsTrigger value="account">로그인</TabsTrigger>
          <TabsTrigger value="password">회원가입</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>로그인</CardTitle>
              <CardDescription>계정이 없다면 회원가입 해주세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="login-email">이메일</Label>
                <Input id="login-email" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="login-password">비밀번호</Label>
                <Input id="login-password" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => login(email, password, '/todo')} disabled={!validateEmail(email) || !validatePassword(password)}>
                로그인
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>회원가입</CardTitle>
              <CardDescription>이미 계정이 있다면 로그인 해주세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="signup-email">이메일</Label>
                <Input id="signup-email" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-password">비밀번호</Label>
                <Input id="signup-password" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => signUp(email, password)} disabled={!validateEmail(email) || !validatePassword(password)}>
                회원가입
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthPage;
