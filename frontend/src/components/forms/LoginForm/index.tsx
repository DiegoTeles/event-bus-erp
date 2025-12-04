'use client';

import { useState, FormEvent } from 'react';
import { Form } from './style';
import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';
import { Message } from '@/src/components/ui/Message';

interface LoginFormProps {
  onSubmit: (username: string) => Promise<void>;
  loading?: boolean;
}

export function LoginForm({ onSubmit, loading = false }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await onSubmit(username);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao fazer login');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        disabled={loading}
      />
      <Button type="submit" variant="gradient" fullWidth disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </Button>
      {error && <Message type="error">{error}</Message>}
    </Form>
  );
}

