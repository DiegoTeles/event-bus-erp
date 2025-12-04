import { Injectable } from '@nestjs/common';
import { IExternalErpClient } from './external-erp-client.interface';
import { Order } from '../../order/entities/order.entity';

@Injectable()
export class FakeExternalErpClient implements IExternalErpClient {
  async sendOrder(
    order: Order,
  ): Promise<{ success: boolean; message?: string }> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const shouldReject = Math.random() < 0.1; // 10% de chance de rejeitar o pedido

    if (shouldReject) {
      return {
        success: false,
        message: 'ERP rejeitou o pedido: estoque insuficiente',
      };
    }

    console.log(
      `[Integration Hub] Pedido ${order.orderId} enviado para ERP com sucesso`,
    );

    return {
      success: true,
      message: 'Pedido enviado para ERP com sucesso',
    };
  }
}
