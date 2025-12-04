import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID da filial. Branches piloto (BRANCH-001, BRANCH-002, BRANCH-003) usam novo sistema. Outras branches usam sistema legado.',
    example: 'BRANCH-001',
  })
  @IsNotEmpty()
  @IsString()
  branchId: string;

  @ApiProperty({
    description: 'ID do item a ser pedido',
    example: 'ITEM-001',
  })
  @IsNotEmpty()
  @IsString()
  itemId: string;

  @ApiProperty({
    description: 'Quantidade do item (deve ser maior que zero)',
    example: 10,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  quantity: number;
}
