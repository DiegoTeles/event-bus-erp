import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Username do usuário',
    example: 'usuario.teste',
  })
  @IsNotEmpty()
  @IsString()
  username: string;
}

