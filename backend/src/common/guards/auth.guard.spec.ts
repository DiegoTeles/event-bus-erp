import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../../auth/services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jest.Mocked<AuthService>;
  let context: ExecutionContext;

  beforeEach(() => {
    authService = {
      validateToken: jest.fn(),
    } as any;
    guard = new AuthGuard(authService);
  });

  const createMockContext = (headers: any): ExecutionContext => {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          headers,
        }),
      }),
    } as ExecutionContext;
  };

  it('deve permitir acesso com token válido', () => {
    const headers = {
      authorization: 'Bearer fake-token-valid-1234567890',
    };
    context = createMockContext(headers);
    authService.validateToken.mockReturnValue(true);

    const result = guard.canActivate(context);

    expect(result).toBe(true);
    expect(authService.validateToken).toHaveBeenCalledWith(
      'fake-token-valid-1234567890',
    );
  });

  it('deve lançar exceção quando token não é fornecido', () => {
    const headers = {};
    context = createMockContext(headers);

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('deve lançar exceção quando token é inválido', () => {
    const headers = {
      authorization: 'Bearer invalid',
    };
    context = createMockContext(headers);
    authService.validateToken.mockReturnValue(false);

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
    expect(authService.validateToken).toHaveBeenCalledWith('invalid');
  });

  it('deve lançar exceção quando token é muito curto', () => {
    const headers = {
      authorization: 'Bearer short',
    };
    context = createMockContext(headers);
    authService.validateToken.mockReturnValue(false);

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
    expect(authService.validateToken).toHaveBeenCalledWith('short');
  });
});
