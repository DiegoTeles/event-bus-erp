import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entities/order.entity';
import { AuthService } from '../../auth/services/auth.service';
import { AuthGuard } from '../../common/guards/auth.guard';

describe('OrderController', () => {
  let controller: OrderController;
  let service: jest.Mocked<OrderService>;

  beforeEach(async () => {
    const mockService: jest.Mocked<OrderService> = {
      createOrder: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      updateOrderStatus: jest.fn(),
    } as any;

    const mockAuthService: jest.Mocked<AuthService> = {
      generateFakeToken: jest.fn(),
      validateToken: jest.fn().mockReturnValue(true),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockService,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        AuthGuard,
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get(OrderService);
  });

  it('deve criar um order', async () => {
    const dto: CreateOrderDto = {
      branchId: 'BRANCH-001',
      itemId: 'ITEM-001',
      quantity: 10,
    };

    const expectedOrder = new Order(
      'ORDER-123',
      dto.branchId,
      dto.itemId,
      dto.quantity,
    );
    service.createOrder.mockResolvedValue(expectedOrder);

    const result = await controller.createOrder(dto);

    expect(result.orderId).toBe('ORDER-123');
    expect(service.createOrder).toHaveBeenCalledWith(dto);
  });

  it('deve buscar order por id', async () => {
    const orderId = 'ORDER-123';
    const expectedOrder = new Order(orderId, 'BRANCH-001', 'ITEM-001', 10);
    service.findById.mockResolvedValue(expectedOrder);

    const result = await controller.getOrderById(orderId);

    expect(result?.orderId).toBe(orderId);
    expect(service.findById).toHaveBeenCalledWith(orderId);
  });

  it('deve retornar null quando order não existe', async () => {
    const orderId = 'ORDER-999';
    service.findById.mockResolvedValue(null);

    const result = await controller.getOrderById(orderId);

    expect(result).toBeNull();
  });

  it('deve listar todos os orders', async () => {
    const orders = [
      new Order('ORDER-1', 'BRANCH-001', 'ITEM-001', 10),
      new Order('ORDER-2', 'BRANCH-002', 'ITEM-002', 20),
    ];
    service.findAll.mockResolvedValue(orders);

    const result = await controller.getOrders();

    expect(result).toHaveLength(2);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('deve filtrar orders por branchId', async () => {
    const branchId = 'BRANCH-001';
    const orders = [new Order('ORDER-1', branchId, 'ITEM-001', 10)];
    service.findAll.mockResolvedValue(orders);

    const result = await controller.getOrders(branchId);

    expect(result).toHaveLength(1);
    expect(service.findAll).toHaveBeenCalledWith(branchId);
  });
});
