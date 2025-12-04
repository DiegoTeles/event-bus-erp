import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../entities/order.entity';
import type { OrderStatus } from '../entities/order.entity';

export class OrderResponseDto {
  @ApiProperty({
    description: 'ID único do pedido',
    example: 'ORDER-1234567890-abc123',
  })
  orderId: string;

  @ApiProperty({
    description: 'ID da filial',
    example: 'BRANCH-001',
  })
  branchId: string;

  @ApiProperty({
    description: 'ID do item',
    example: 'ITEM-001',
  })
  itemId: string;

  @ApiProperty({
    description: 'Quantidade do item',
    example: 10,
  })
  quantity: number;

  @ApiProperty({
    description: 'Status do pedido',
    enum: ['CREATED', 'SENT_TO_ERP', 'REJECTED'],
    example: 'CREATED',
  })
  status: OrderStatus;

  @ApiProperty({
    description: 'Data de criação do pedido',
    type: Date,
    example: '2025-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do pedido',
    type: Date,
    example: '2025-01-15T10:30:00.000Z',
  })
  updatedAt: Date;

  static fromEntity(order: Order): OrderResponseDto {
    return {
      orderId: order.orderId,
      branchId: order.branchId,
      itemId: order.itemId,
      quantity: order.quantity,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}
