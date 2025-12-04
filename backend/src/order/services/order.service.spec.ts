import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { OrderService } from './order.service';
import { IOrderRepository } from '../repositories/order.repository.interface';
import { ILegacyOrderGateway } from '../gateways/legacy-order.gateway.interface';
import { OrderCreatedPublisher } from '../publishers/order-created.publisher';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entities/order.entity';

describe('OrderService', () => {
  let service: OrderService;
  let orderRepository: jest.Mocked<IOrderRepository>;
  let legacyOrderGateway: jest.Mocked<ILegacyOrderGateway>;
  let orderCreatedPublisher: jest.Mocked<OrderCreatedPublisher>;

  beforeEach(async () => {
    const mockRepository: jest.Mocked<IOrderRepository> = {
      findById: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findByBranchId: jest.fn(),
    };

    const mockLegacyGateway: jest.Mocked<ILegacyOrderGateway> = {
      createOrder: jest.fn(),
    };

    const mockPublisher: jest.Mocked<OrderCreatedPublisher> = {
      publish: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: 'IOrderRepository',
          useValue: mockRepository,
        },
        {
          provide: 'ILegacyOrderGateway',
          useValue: mockLegacyGateway,
        },
        {
          provide: OrderCreatedPublisher,
          useValue: mockPublisher,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepository = module.get('IOrderRepository');
    legacyOrderGateway = module.get('ILegacyOrderGateway');
    orderCreatedPublisher = module.get(OrderCreatedPublisher);
  });

  it('deve criar um order com sucesso para branch piloto', async () => {
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

    orderRepository.create.mockResolvedValue(expectedOrder);
    orderCreatedPublisher.publish.mockResolvedValue(undefined);

    const result = await service.createOrder(dto);

    expect(result).toEqual(expectedOrder);
    expect(orderRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        branchId: dto.branchId,
        itemId: dto.itemId,
        quantity: dto.quantity,
      }),
    );
    expect(orderCreatedPublisher.publish).toHaveBeenCalledWith(expectedOrder);
    expect(legacyOrderGateway.createOrder).not.toHaveBeenCalled();
  });

  it('deve delegar para legacy gateway quando branch não é piloto e retornar sucesso', async () => {
    const dto: CreateOrderDto = {
      branchId: 'BRANCH-999',
      itemId: 'ITEM-001',
      quantity: 10,
    };

    legacyOrderGateway.createOrder.mockResolvedValue({
      orderId: 'LEGACY-123',
      status: 'CREATED',
    });

    const result = await service.createOrder(dto);

    expect(result.orderId).toBe('LEGACY-123');
    expect(result.branchId).toBe(dto.branchId);
    expect(result.itemId).toBe(dto.itemId);
    expect(result.quantity).toBe(dto.quantity);
    expect(result.status).toBe('CREATED');
    expect(legacyOrderGateway.createOrder).toHaveBeenCalledWith(dto);
    expect(orderRepository.create).not.toHaveBeenCalled();
    expect(orderCreatedPublisher.publish).not.toHaveBeenCalled();
  });

  it('deve lançar erro quando quantity é menor ou igual a zero', async () => {
    const dto: CreateOrderDto = {
      branchId: 'BRANCH-001',
      itemId: 'ITEM-001',
      quantity: 0,
    };

    await expect(service.createOrder(dto)).rejects.toThrow(BadRequestException);
    await expect(service.createOrder(dto)).rejects.toThrow(
      'Quantidade deve ser maior que zero',
    );
  });

  it('deve buscar order por id', async () => {
    const orderId = 'ORDER-123';
    const expectedOrder = new Order(orderId, 'BRANCH-001', 'ITEM-001', 10);

    orderRepository.findById.mockResolvedValue(expectedOrder);

    const result = await service.findById(orderId);

    expect(result).toEqual(expectedOrder);
    expect(orderRepository.findById).toHaveBeenCalledWith(orderId);
  });

  it('deve atualizar status do order', async () => {
    const orderId = 'ORDER-123';
    const existingOrder = new Order(orderId, 'BRANCH-001', 'ITEM-001', 10);
    const updatedOrder = new Order(orderId, 'BRANCH-001', 'ITEM-001', 10);
    updatedOrder.updateStatus('SENT_TO_ERP');

    orderRepository.findById.mockResolvedValue(existingOrder);
    orderRepository.update.mockResolvedValue(updatedOrder);

    const result = await service.updateOrderStatus(orderId, 'SENT_TO_ERP');

    expect(result?.status).toBe('SENT_TO_ERP');
    expect(orderRepository.update).toHaveBeenCalled();
  });
});
