import { Test, TestingModule } from '@nestjs/testing';
import { IntegrationHubService } from './integration-hub.service';
import { IExternalErpClient } from '../clients/external-erp-client.interface';
import { OrderService } from '../../order/services/order.service';
import { Order } from '../../order/entities/order.entity';

describe('IntegrationHubService', () => {
  let service: IntegrationHubService;
  let externalErpClient: jest.Mocked<IExternalErpClient>;
  let orderService: jest.Mocked<OrderService>;

  beforeEach(async () => {
    const mockErpClient: jest.Mocked<IExternalErpClient> = {
      sendOrder: jest.fn(),
    };

    const mockOrderService: jest.Mocked<OrderService> = {
      findById: jest.fn(),
      updateOrderStatus: jest.fn(),
      createOrder: jest.fn(),
      findAll: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IntegrationHubService,
        {
          provide: 'IExternalErpClient',
          useValue: mockErpClient,
        },
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    service = module.get<IntegrationHubService>(IntegrationHubService);
    externalErpClient = module.get('IExternalErpClient');
    orderService = module.get(OrderService);
  });

  it('deve processar order criado e atualizar status para SENT_TO_ERP quando sucesso', async () => {
    const order = new Order('ORDER-123', 'BRANCH-001', 'ITEM-001', 10);
    orderService.findById.mockResolvedValue(order);
    externalErpClient.sendOrder.mockResolvedValue({
      success: true,
      message: 'Sucesso',
    });
    orderService.updateOrderStatus.mockResolvedValue(order);

    await service.processOrderCreated('ORDER-123');

    expect(orderService.findById).toHaveBeenCalledWith('ORDER-123');
    expect(externalErpClient.sendOrder).toHaveBeenCalledWith(order);
    expect(orderService.updateOrderStatus).toHaveBeenCalledWith(
      'ORDER-123',
      'SENT_TO_ERP',
    );
  });

  it('deve atualizar status para REJECTED quando ERP rejeita', async () => {
    const order = new Order('ORDER-123', 'BRANCH-001', 'ITEM-001', 10);
    orderService.findById.mockResolvedValue(order);
    externalErpClient.sendOrder.mockResolvedValue({
      success: false,
      message: 'Estoque insuficiente',
    });
    orderService.updateOrderStatus.mockResolvedValue(order);

    await service.processOrderCreated('ORDER-123');

    expect(orderService.updateOrderStatus).toHaveBeenCalledWith(
      'ORDER-123',
      'REJECTED',
    );
  });

  it('deve lidar com erro quando order não existe', async () => {
    orderService.findById.mockResolvedValue(null);

    await service.processOrderCreated('ORDER-999');

    expect(externalErpClient.sendOrder).not.toHaveBeenCalled();
    expect(orderService.updateOrderStatus).not.toHaveBeenCalled();
  });
});
