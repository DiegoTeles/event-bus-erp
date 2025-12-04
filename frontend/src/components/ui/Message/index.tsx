import { ErrorMessage as StyledErrorMessage, SuccessMessage as StyledSuccessMessage } from './style';

interface MessageProps {
  type: 'error' | 'success';
  children: React.ReactNode;
}

export function Message({ type, children }: MessageProps) {
  if (type === 'error') {
    return <StyledErrorMessage>{children}</StyledErrorMessage>;
  }
  return <StyledSuccessMessage>{children}</StyledSuccessMessage>;
}

