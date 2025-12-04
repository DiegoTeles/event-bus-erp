import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../index';

describe('LoginForm', () => {
  it('deve renderizar o formulário de login', () => {
    const mockOnSubmit = jest.fn();
    render(<LoginForm onSubmit={mockOnSubmit} />);

    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('deve chamar onSubmit com o username quando o formulário é submetido', async () => {
    const mockOnSubmit = jest.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();

    render(<LoginForm onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText(/username/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    await user.type(input, 'testuser');
    await user.click(button);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith('testuser');
    });
  });

  it('deve mostrar mensagem de erro quando onSubmit falha', async () => {
    const mockOnSubmit = jest.fn().mockRejectedValue({
      response: { data: { message: 'Credenciais inválidas' } },
    });
    const user = userEvent.setup();

    render(<LoginForm onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText(/username/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    await user.type(input, 'testuser');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/credenciais inválidas/i)).toBeInTheDocument();
    });
  });

  it('deve desabilitar o botão quando loading é true', () => {
    const mockOnSubmit = jest.fn();
    render(<LoginForm onSubmit={mockOnSubmit} loading />);

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByPlaceholderText(/username/i)).toBeDisabled();
  });

  it('deve mostrar texto de loading quando loading é true', () => {
    const mockOnSubmit = jest.fn();
    render(<LoginForm onSubmit={mockOnSubmit} loading />);

    expect(screen.getByText(/entrando/i)).toBeInTheDocument();
  });
});

