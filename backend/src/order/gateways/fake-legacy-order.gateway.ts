import { Injectable } from '@nestjs/common';
import { ILegacyOrderGateway } from './legacy-order.gateway.interface';
import { CreateOrderDto } from '../dto/create-order.dto';

@Injectable()
export class FakeLegacyOrderGateway implements ILegacyOrderGateway {
  async createOrder(
    dto: CreateOrderDto,
  ): Promise<{ orderId: string; status: string }> {
    console.log('createOrder', dto);
    await new Promise((resolve) => setTimeout(resolve, 100));

    const legacyOrderId = `LEGACY-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

    return {
      orderId: legacyOrderId,
      status: 'CREATED',
    };
  }
}
