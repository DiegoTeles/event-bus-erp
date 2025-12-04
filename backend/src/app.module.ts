import { Module, Global } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { IntegrationHubModule } from './integration-hub/integration-hub.module';
import { AuthModule } from './auth/auth.module';
import { EventBus } from './common/events/event-bus';

@Global()
@Module({
  providers: [EventBus],
  exports: [EventBus],
})
export class CommonModule {}

@Module({
  imports: [CommonModule, OrderModule, IntegrationHubModule, AuthModule],
})
export class AppModule {}
