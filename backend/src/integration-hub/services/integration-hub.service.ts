import { Injectable, Inject } from '@nestjs/common';
import type { IExternalErpClient } from '../clients/external-erp-client.interface';
import { OrderService } from '../../order/services/order.service';

@Injectable()
export class IntegrationHubService {
  constructor(
    @Inject('IExternalErpClient')
    private readonly externalErpClient: IExternalErpClient,
    private readonly orderService: OrderService,
  ) {}

  async processOrderCreated(orderId: string): Promise<void> {
    const order = await this.orderService.findById(orderId);

    if (!order) {
      console.error(`[Integration Hub] Pedido ${orderId} não encontrado`);
      return;
    }

    try {
      const result = await this.externalErpClient.sendOrder(order);

      if (result.success) {
        await this.orderService.updateOrderStatus(orderId, 'SENT_TO_ERP');
        console.log(
          `[Integration Hub] Status do pedido ${orderId} atualizado para SENT_TO_ERP`,
        );
      } else {
        await this.orderService.updateOrderStatus(orderId, 'REJECTED');
        console.log(
          `[Integration Hub] Status do pedido ${orderId} atualizado para REJECTED: ${result.message}`,
        );
      }
    } catch (error) {
      console.error(
        `[Integration Hub] Erro ao processar pedido ${orderId}:`,
        error,
      );
      await this.orderService.updateOrderStatus(orderId, 'REJECTED');
    }
  }
}
