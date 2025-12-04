import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
import { apiService } from '@/src/services/api';
import React from 'react';

jest.mock('@/src/services/api', () => ({
  apiService: {
    login: jest.fn(),
    setToken: jest.fn(),
  },
}));

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  });

  it('deve fornecer valores iniciais corretos', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.token).toBe(null);
    expect(result.current.loading).toBe(false);
  });

  it('deve fazer login e atualizar o token', async () => {
    const mockToken = 'fake-token-123';
    (apiService.login as jest.Mock).mockResolvedValue({ token: mockToken });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login('testuser');
    });

    expect(apiService.login).toHaveBeenCalledWith('testuser');
    expect(apiService.setToken).toHaveBeenCalledWith(mockToken);
    expect(result.current.token).toBe(mockToken);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('deve fazer logout e limpar o token', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.logout();
    });

    expect(result.current.token).toBe(null);
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('deve carregar token do localStorage na inicialização', () => {
    const savedToken = 'saved-token-123';
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', savedToken);
    }

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.token).toBe(savedToken);
    expect(result.current.isAuthenticated).toBe(true);
  });
});

