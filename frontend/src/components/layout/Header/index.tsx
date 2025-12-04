import { ReactNode } from 'react';
import { Header as StyledHeader, Title } from './style';

interface HeaderProps {
  title: string;
  actions?: ReactNode;
}

export function Header({ title, actions }: HeaderProps) {
  return (
    <StyledHeader>
      <Title>{title}</Title>
      {actions && <div>{actions}</div>}
    </StyledHeader>
  );
}

