import { render, screen } from '@testing-library/react';
import { OrderItem } from '../index';

const mockOrder = {
  orderId: 'ORDER-001',
  branchId: 'BRANCH-001',
  itemId: 'ITEM-001',
  quantity: 10,
  status: 'CREATED' as const,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

describe('OrderItem', () => {
  it('deve renderizar informações do pedido', () => {
    render(<OrderItem order={mockOrder} />);
    
    expect(screen.getByText(/order-001/i)).toBeInTheDocument();
    expect(screen.getByText(/branch-001/i)).toBeInTheDocument();
    expect(screen.getByText(/item-001/i)).toBeInTheDocument();
    expect(screen.getByText(/10/i)).toBeInTheDocument();
  });

  it('deve renderizar o status do pedido', () => {
    render(<OrderItem order={mockOrder} />);
    const statusBadges = screen.getAllByText(/criado/i);
    expect(statusBadges.length).toBeGreaterThan(0);
  });

  it('deve renderizar diferentes status corretamente', () => {
    const { rerender } = render(<OrderItem order={mockOrder} />);
    expect(screen.getAllByText(/criado/i).length).toBeGreaterThan(0);

    rerender(<OrderItem order={{ ...mockOrder, status: 'SENT_TO_ERP' }} />);
    expect(screen.getByText(/enviado/i)).toBeInTheDocument();

    rerender(<OrderItem order={{ ...mockOrder, status: 'REJECTED' }} />);
    expect(screen.getByText(/rejeitado/i)).toBeInTheDocument();
  });
});

