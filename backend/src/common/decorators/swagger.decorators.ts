import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateOrderDto } from '../../order/dto/create-order.dto';
import { OrderResponseDto } from '../../order/dto/order-response.dto';

export function ApiOrderController() {
  return applyDecorators(
    ApiTags('Orders'),
    ApiBearerAuth('JWT-auth'),
    ApiUnauthorizedResponse({
      description: 'Token não fornecido ou inválido',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 401 },
          message: { type: 'string', example: 'Token não fornecido' },
        },
      },
    }),
  );
}

export function ApiCreateOrder() {
  return applyDecorators(
    ApiOperation({
      summary: 'Cria um novo pedido',
      description:
        'Cria um novo pedido de insumo. Branches piloto (BRANCH-001, BRANCH-002, BRANCH-003) são processadas no novo sistema. Outras branches são processadas no sistema legado (Strangler Pattern). Ambos retornam sucesso.',
    }),
    ApiBody({ type: CreateOrderDto }),
    ApiCreatedResponse({
      description: 'Pedido criado com sucesso',
      type: OrderResponseDto,
    }),
    ApiBadRequestResponse({
      description: 'Dados inválidos (ex: quantity <= 0)',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          message: {
            type: 'string',
            example: 'Quantidade deve ser maior que zero',
          },
        },
      },
    }),
  );
}

export function ApiGetOrderById() {
  return applyDecorators(
    ApiOperation({
      summary: 'Busca um pedido por ID',
      description: 'Retorna os detalhes de um pedido específico pelo seu ID.',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'ID do pedido',
      example: 'ORDER-1234567890-abc123',
    }),
    ApiOkResponse({
      description: 'Pedido encontrado',
      type: OrderResponseDto,
    }),
    ApiNotFoundResponse({
      description: 'Pedido não encontrado',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 404 },
          message: { type: 'string', example: 'Order not found' },
        },
      },
    }),
  );
}

export function ApiListOrders() {
  return applyDecorators(
    ApiOperation({
      summary: 'Lista pedidos',
      description:
        'Retorna uma lista de pedidos. Pode ser filtrada por branchId através do query parameter.',
    }),
    ApiQuery({
      name: 'branchId',
      required: false,
      type: 'string',
      description: 'Filtrar pedidos por ID da filial',
      example: 'BRANCH-001',
    }),
    ApiOkResponse({
      description: 'Lista de pedidos',
      type: [OrderResponseDto],
    }),
  );
}

