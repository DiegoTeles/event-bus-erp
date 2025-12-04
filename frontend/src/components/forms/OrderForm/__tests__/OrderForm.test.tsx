import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OrderForm } from '../index';

describe('OrderForm', () => {
  it('deve renderizar o formulário de pedido', () => {
    const mockOnSubmit = jest.fn();
    render(<OrderForm onSubmit={mockOnSubmit} />);

    expect(screen.getByText(/filial/i)).toBeInTheDocument();
    expect(screen.getByText(/id do item/i)).toBeInTheDocument();
    expect(screen.getByText(/quantidade/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/digite ou selecione uma filial/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/item-001/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/10/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /criar pedido/i })).toBeInTheDocument();
  });

  it('deve chamar onSubmit com os dados corretos quando o formulário é submetido', async () => {
    const mockOnSubmit = jest.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();

    render(<OrderForm onSubmit={mockOnSubmit} />);

    const itemInput = screen.getByPlaceholderText(/item-001/i);
    const quantityInput = screen.getByPlaceholderText(/10/i);
    const submitButton = screen.getByRole('button', { name: /criar pedido/i });

    await user.type(itemInput, 'ITEM-123');
    await user.type(quantityInput, '5');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        branchId: 'BRANCH-001',
        itemId: 'ITEM-123',
        quantity: 5,
      });
    });
  });

  it('deve limpar os campos itemId e quantity após sucesso', async () => {
    const mockOnSubmit = jest.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();

    render(<OrderForm onSubmit={mockOnSubmit} />);

    const itemInput = screen.getByPlaceholderText(/item-001/i) as HTMLInputElement;
    const quantityInput = screen.getByPlaceholderText(/10/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /criar pedido/i });

    await user.type(itemInput, 'ITEM-123');
    await user.type(quantityInput, '5');
    await user.click(submitButton);

    await waitFor(() => {
      expect(itemInput.value).toBe('');
      expect(quantityInput.value).toBe('');
    });
  });

  it('não deve submeter se a quantidade for menor ou igual a zero', async () => {
    const mockOnSubmit = jest.fn();
    const user = userEvent.setup();

    render(<OrderForm onSubmit={mockOnSubmit} />);

    const itemInput = screen.getByPlaceholderText(/item-001/i);
    const quantityInput = screen.getByPlaceholderText(/10/i);
    const submitButton = screen.getByRole('button', { name: /criar pedido/i });

    await user.type(itemInput, 'ITEM-123');
    await user.type(quantityInput, '0');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  it('deve desabilitar o botão quando loading é true', () => {
    const mockOnSubmit = jest.fn();
    render(<OrderForm onSubmit={mockOnSubmit} loading />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('deve mostrar texto de loading quando loading é true', () => {
    const mockOnSubmit = jest.fn();
    render(<OrderForm onSubmit={mockOnSubmit} loading />);

    expect(screen.getByText(/criando/i)).toBeInTheDocument();
  });
});

