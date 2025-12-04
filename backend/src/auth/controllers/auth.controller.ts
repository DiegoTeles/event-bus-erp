import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Realiza login e obtém token de autenticação',
    description:
      'Gera um token fake para autenticação. Use este token no header Authorization: Bearer <token> para acessar os endpoints protegidos.',
  })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'Login realizado com sucesso',
    type: LoginResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: [
            'username should not be empty',
            'username must be a string',
          ],
        },
      },
    },
  })
  login(@Body() loginDto: LoginDto): LoginResponseDto {
    const token = this.authService.generateFakeToken(loginDto.username);
    return {
      token,
      type: 'Bearer',
    };
  }
}
