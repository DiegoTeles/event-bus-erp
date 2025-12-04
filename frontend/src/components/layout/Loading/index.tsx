import { LoadingContainer } from './style';

interface LoadingProps {
  message?: string;
}

export function Loading({ message = 'Carregando...' }: LoadingProps) {
  return <LoadingContainer>{message}</LoadingContainer>;
}

