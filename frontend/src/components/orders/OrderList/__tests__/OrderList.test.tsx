import { render, screen } from '@testing-library/react';
import { OrderList } from '../index';

const mockOrders = [
  {
    orderId: 'ORDER-001',
    branchId: 'BRANCH-001',
    itemId: 'ITEM-001',
    quantity: 10,
    status: 'CREATED' as const,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    orderId: 'ORDER-002',
    branchId: 'BRANCH-002',
    itemId: 'ITEM-002',
    quantity: 5,
    status: 'SENT_TO_ERP' as const,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

describe('OrderList', () => {
  it('deve renderizar mensagem quando não há pedidos', () => {
    render(<OrderList orders={[]} />);
    expect(screen.getByText(/nenhum pedido encontrado/i)).toBeInTheDocument();
  });

  it('deve renderizar lista de pedidos', () => {
    render(<OrderList orders={mockOrders} />);
    expect(screen.getByText(/order-001/i)).toBeInTheDocument();
    expect(screen.getByText(/order-002/i)).toBeInTheDocument();
  });

  it('deve renderizar informações de cada pedido', () => {
    render(<OrderList orders={mockOrders} />);
    
    expect(screen.getByText(/branch-001/i)).toBeInTheDocument();
    expect(screen.getByText(/item-001/i)).toBeInTheDocument();
    expect(screen.getByText(/10/i)).toBeInTheDocument();
  });
});

