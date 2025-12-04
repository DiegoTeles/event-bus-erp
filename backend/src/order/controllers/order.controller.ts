import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderResponseDto } from '../dto/order-response.dto';
import { AuthGuard } from '../../common/guards/auth.guard';
import {
  ApiOrderController,
  ApiCreateOrder,
  ApiGetOrderById,
  ApiListOrders,
} from '../../common/decorators/swagger.decorators';

@Controller('orders')
@UseGuards(AuthGuard)
@ApiOrderController()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateOrder()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<OrderResponseDto> {
    const order = await this.orderService.createOrder(createOrderDto);
    return OrderResponseDto.fromEntity(order);
  }

  @Get(':id')
  @ApiGetOrderById()
  async getOrderById(
    @Param('id') id: string,
  ): Promise<OrderResponseDto | null> {
    const order = await this.orderService.findById(id);
    return order ? OrderResponseDto.fromEntity(order) : null;
  }

  @Get()
  @ApiListOrders()
  async getOrders(
    @Query('branchId') branchId?: string,
  ): Promise<OrderResponseDto[]> {
    const orders = await this.orderService.findAll(branchId);
    return orders.map((order) => OrderResponseDto.fromEntity(order));
  }
}
