import { Injectable } from '@nestjs/common';
import { EventBus } from '../../common/events/event-bus';
import { OrderCreatedEvent } from '../events/order-created.event';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderCreatedPublisher {
  constructor(private readonly eventBus: EventBus) {}

  async publish(order: Order): Promise<void> {
    await this.eventBus.publish(new OrderCreatedEvent(order));
  }
}
