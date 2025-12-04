import { OrderItem as StyledOrderItem, OrderHeader, OrderId, OrderDetails } from './style';
import { StatusBadge } from '@/src/components/ui/StatusBadge';

interface Order {
  orderId: string;
  branchId: string;
  itemId: string;
  quantity: number;
  status: 'CREATED' | 'SENT_TO_ERP' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

interface OrderItemProps {
  order: Order;
}

export function OrderItem({ order }: OrderItemProps) {
  return (
    <StyledOrderItem>
      <OrderHeader>
        <OrderId>{order.orderId}</OrderId>
        <StatusBadge status={order.status} />
      </OrderHeader>
      <OrderDetails>
        <div>
          <strong>Filial:</strong> {order.branchId}
        </div>
        <div>
          <strong>Item:</strong> {order.itemId}
        </div>
        <div>
          <strong>Quantidade:</strong> {order.quantity}
        </div>
        <div>
          <strong>Criado:</strong> {new Date(order.createdAt).toLocaleString('pt-BR')}
        </div>
      </OrderDetails>
    </StyledOrderItem>
  );
}

