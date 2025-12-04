import { OrdersList as StyledOrdersList, EmptyState } from './style';
import { OrderItem } from '../OrderItem';

interface Order {
  orderId: string;
  branchId: string;
  itemId: string;
  quantity: number;
  status: 'CREATED' | 'SENT_TO_ERP' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

interface OrderListProps {
  orders: Order[];
}

export function OrderList({ orders }: OrderListProps) {
  if (orders.length === 0) {
    return <EmptyState>Nenhum pedido encontrado</EmptyState>;
  }

  return (
    <StyledOrdersList>
      {orders.map((order) => (
        <OrderItem key={order.orderId} order={order} />
      ))}
    </StyledOrdersList>
  );
}

