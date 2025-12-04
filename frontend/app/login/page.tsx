'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/contexts/AuthContext';
import { LoginContainer } from '@/src/components/layout';
import { LoginForm } from '@/src/components/forms';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (username: string) => {
    await login(username);
    router.push('/orders');
  };

  return (
    <LoginContainer title="Portal Interno" subtitle="Faça login para acessar o sistema">
      <LoginForm onSubmit={handleLogin} />
    </LoginContainer>
  );
}
