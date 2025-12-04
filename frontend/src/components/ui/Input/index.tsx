import { InputHTMLAttributes, SelectHTMLAttributes } from 'react';
import { Input as StyledInput, Select as StyledSelect } from './style';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return <StyledInput {...props} />;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

export function Select({ options, children, ...props }: SelectProps) {
  return (
    <StyledSelect {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
      {children}
    </StyledSelect>
  );
}

