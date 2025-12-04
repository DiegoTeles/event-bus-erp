import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { InMemoryOrderRepository } from './repositories/in-memory-order.repository';
import { FakeLegacyOrderGateway } from './gateways/fake-legacy-order.gateway';
import { OrderCreatedPublisher } from './publishers/order-created.publisher';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderCreatedPublisher,
    {
      provide: 'IOrderRepository',
      useClass: InMemoryOrderRepository,
    },
    {
      provide: 'ILegacyOrderGateway',
      useClass: FakeLegacyOrderGateway,
    },
  ],
  exports: [OrderService],
})
export class OrderModule {}
