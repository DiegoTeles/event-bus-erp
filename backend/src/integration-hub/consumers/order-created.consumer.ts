import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventBus } from '../../common/events/event-bus';
import { OrderCreatedEvent } from '../../order/events/order-created.event';
import { IntegrationHubService } from '../services/integration-hub.service';

@Injectable()
export class OrderCreatedConsumer implements OnModuleInit {
  constructor(
    private readonly eventBus: EventBus,
    private readonly integrationHubService: IntegrationHubService,
  ) {}

  onModuleInit() {
    this.eventBus.subscribe<OrderCreatedEvent>(
      'Order.Created',
      async (event: OrderCreatedEvent) => {
        await this.integrationHubService.processOrderCreated(
          event.order.orderId,
        );
      },
    );
  }
}
