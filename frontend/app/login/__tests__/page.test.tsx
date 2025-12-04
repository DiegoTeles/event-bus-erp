import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/contexts/AuthContext';
import LoginPage from '../page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/src/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('LoginPage', () => {
  const mockPush = jest.fn();
  const mockLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
    });
  });

  it('deve renderizar o formulário de login', () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
  });

  it('deve redirecionar para /orders após login bem-sucedido', async () => {
    mockLogin.mockResolvedValue(undefined);
    const user = userEvent.setup();

    render(<LoginPage />);

    const input = screen.getByPlaceholderText(/username/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    await user.type(input, 'testuser');
    await user.click(button);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('testuser');
      expect(mockPush).toHaveBeenCalledWith('/orders');
    });
  });
});

