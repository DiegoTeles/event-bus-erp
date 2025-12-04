import { render, screen } from '@testing-library/react';
import { StatusBadge } from '../index';

describe('StatusBadge', () => {
  it('deve renderizar o badge com status CREATED', () => {
    render(<StatusBadge status="CREATED" />);
    expect(screen.getByText(/criado/i)).toBeInTheDocument();
  });

  it('deve renderizar o badge com status SENT_TO_ERP', () => {
    render(<StatusBadge status="SENT_TO_ERP" />);
    expect(screen.getByText(/enviado/i)).toBeInTheDocument();
  });

  it('deve renderizar o badge com status REJECTED', () => {
    render(<StatusBadge status="REJECTED" />);
    expect(screen.getByText(/rejeitado/i)).toBeInTheDocument();
  });
});

