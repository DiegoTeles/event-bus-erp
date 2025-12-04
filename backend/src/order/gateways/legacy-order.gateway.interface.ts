import { CreateOrderDto } from '../dto/create-order.dto';

export interface ILegacyOrderGateway {
  createOrder(
    dto: CreateOrderDto,
  ): Promise<{ orderId: string; status: string }>;
}
