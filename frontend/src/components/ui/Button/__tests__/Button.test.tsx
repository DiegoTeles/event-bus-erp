import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../index';

describe('Button', () => {
  it('deve renderizar o botão com o texto fornecido', () => {
    render(<Button>Clique aqui</Button>);
    expect(screen.getByRole('button', { name: /clique aqui/i })).toBeInTheDocument();
  });

  it('deve chamar onClick quando clicado', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Clique</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('deve estar desabilitado quando disabled é true', () => {
    render(<Button disabled>Desabilitado</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('deve aplicar variant secondary', () => {
    render(<Button variant="secondary">Secundário</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('secondary');
  });

  it('deve aplicar variant gradient', () => {
    render(<Button variant="gradient">Gradiente</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('gradient');
  });

  it('deve aplicar fullWidth quando fornecido', () => {
    render(<Button fullWidth>Largura total</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('full-width');
  });
});

