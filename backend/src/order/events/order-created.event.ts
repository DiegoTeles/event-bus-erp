import { BaseEvent } from '../../common/events/base-event';
import { Order } from '../entities/order.entity';

export class OrderCreatedEvent extends BaseEvent {
  readonly eventName = 'Order.Created';
  readonly order: Order;

  constructor(order: Order) {
    super();
    this.order = order;
  }
}
