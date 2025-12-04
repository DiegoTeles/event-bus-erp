import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button as StyledButton } from './style';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'gradient';
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}: ButtonProps) {
  const classes = [
    variant === 'secondary' ? 'secondary' : '',
    variant === 'gradient' ? 'gradient' : '',
    fullWidth ? 'full-width' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <StyledButton className={classes} {...props}>
      {children}
    </StyledButton>
  );
}

