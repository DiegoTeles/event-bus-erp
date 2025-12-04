import { Order } from '../../order/entities/order.entity';

export interface IExternalErpClient {
  sendOrder(order: Order): Promise<{ success: boolean; message?: string }>;
}
