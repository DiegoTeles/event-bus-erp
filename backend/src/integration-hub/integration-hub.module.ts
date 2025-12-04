import { Module } from '@nestjs/common';
import { IntegrationHubService } from './services/integration-hub.service';
import { FakeExternalErpClient } from './clients/fake-external-erp-client';
import { OrderCreatedConsumer } from './consumers/order-created.consumer';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [OrderModule],
  providers: [
    IntegrationHubService,
    OrderCreatedConsumer,
    {
      provide: 'IExternalErpClient',
      useClass: FakeExternalErpClient,
    },
  ],
})
export class IntegrationHubModule {}
