import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import type { IOrderRepository } from '../repositories/order.repository.interface';
import type { ILegacyOrderGateway } from '../gateways/legacy-order.gateway.interface';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entities/order.entity';
import { OrderCreatedPublisher } from '../publishers/order-created.publisher';

@Injectable()
export class OrderService {
  private readonly pilotBranches = ['BRANCH-001', 'BRANCH-002', 'BRANCH-003'];

  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
    @Inject('ILegacyOrderGateway')
    private readonly legacyOrderGateway: ILegacyOrderGateway,
    private readonly orderCreatedPublisher: OrderCreatedPublisher,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    if (dto.quantity <= 0) {
      throw new BadRequestException('Quantidade deve ser maior que zero');
    }

    const isPilotBranch = this.pilotBranches.includes(dto.branchId);

    if (!isPilotBranch) {
      const legacyResult = await this.legacyOrderGateway.createOrder(dto);

      const legacyOrder = new Order(
        legacyResult.orderId,
        dto.branchId,
        dto.itemId,
        dto.quantity,
        legacyResult.status as Order['status'],
      );

      return legacyOrder;
    }

    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    const order = new Order(orderId, dto.branchId, dto.itemId, dto.quantity);

    const savedOrder = await this.orderRepository.create(order);

    await this.orderCreatedPublisher.publish(savedOrder);

    return savedOrder;
  }

  async findById(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async findAll(branchId?: string): Promise<Order[]> {
    if (branchId) {
      return this.orderRepository.findByBranchId(branchId);
    }
    return this.orderRepository.findAll();
  }

  async updateOrderStatus(
    orderId: string,
    status: Order['status'],
  ): Promise<Order | null> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      return null;
    }

    order.updateStatus(status);
    return this.orderRepository.update(orderId, order);
  }
}
