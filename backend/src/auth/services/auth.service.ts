import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  generateFakeToken(username: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `fake-token-${username}-${timestamp}-${random}`;
  }

  validateToken(token: string): boolean {
    if (!token || token === 'invalid') {
      return false;
    }

    if (token.length < 10) {
      return false;
    }

    if (!token.startsWith('fake-token-')) {
      return false;
    }

    return true;
  }
}
