import { ReactNode } from 'react';
import { Container as StyledContainer, Card, Title, Subtitle } from './style';

interface LoginContainerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function LoginContainer({ children, title, subtitle }: LoginContainerProps) {
  return (
    <StyledContainer>
      <Card>
        {title && <Title>{title}</Title>}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        {children}
      </Card>
    </StyledContainer>
  );
}

