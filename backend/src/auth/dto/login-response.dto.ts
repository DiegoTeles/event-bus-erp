import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    description: 'Token de autenticação (Bearer token)',
    example: 'fake-token-usuario.teste-1234567890-abc123',
  })
  token: string;

  @ApiProperty({
    description: 'Tipo do token',
    example: 'Bearer',
  })
  type: string;
}

