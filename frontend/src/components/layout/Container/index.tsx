import { ReactNode } from 'react';
import { Container as StyledContainer, Content as StyledContent } from './style';

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return <StyledContainer>{children}</StyledContainer>;
}

interface ContentProps {
  children: ReactNode;
}

export function Content({ children }: ContentProps) {
  return <StyledContent>{children}</StyledContent>;
}

