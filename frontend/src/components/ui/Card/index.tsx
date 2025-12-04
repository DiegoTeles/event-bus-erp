import { ReactNode } from 'react';
import { Card as StyledCard, CardTitle as StyledCardTitle } from './style';

interface CardProps {
  children: ReactNode;
  title?: string;
  fullHeight?: boolean;
}

export function Card({ children, title, fullHeight }: CardProps) {
  return (
    <StyledCard fullHeight={fullHeight}>
      {title && <StyledCardTitle>{title}</StyledCardTitle>}
      {children}
    </StyledCard>
  );
}

