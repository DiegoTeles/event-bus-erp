import { Injectable } from '@nestjs/common';
import { IOrderRepository } from './order.repository.interface';
import { Order } from '../entities/order.entity';

@Injectable()
export class InMemoryOrderRepository implements IOrderRepository {
  private orders: Map<string, Order> = new Map();

  findById(id: string): Promise<Order | null> {
    return Promise.resolve(this.orders.get(id) || null);
  }

  findAll(): Promise<Order[]> {
    return Promise.resolve(Array.from(this.orders.values()));
  }

  create(entity: Order): Promise<Order> {
    this.orders.set(entity.orderId, entity);
    return Promise.resolve(entity);
  }

  update(id: string, entity: Partial<Order>): Promise<Order | null> {
    const existing = this.orders.get(id);
    if (!existing) {
      return Promise.resolve(null);
    }

    const updated = { ...existing, ...entity };
    this.orders.set(id, updated as Order);
    return Promise.resolve(updated as Order);
  }

  delete(id: string): Promise<boolean> {
    return Promise.resolve(this.orders.delete(id));
  }

  findByBranchId(branchId: string): Promise<Order[]> {
    return Promise.resolve(
      Array.from(this.orders.values()).filter(
        (order) => order.branchId === branchId,
      ),
    );
  }
}
