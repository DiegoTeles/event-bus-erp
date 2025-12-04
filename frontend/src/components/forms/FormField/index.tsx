import { ReactNode } from 'react';
import { FormField as StyledFormField, Label } from './style';

interface FormFieldProps {
  label: string;
  children: ReactNode;
  required?: boolean;
}

export function FormField({ label, children, required = false }: FormFieldProps) {
  return (
    <StyledFormField>
      <Label>
        {label}
        {required && <span style={{ color: '#e53e3e' }}> *</span>}
      </Label>
      {children}
    </StyledFormField>
  );
}

