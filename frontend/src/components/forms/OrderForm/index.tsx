'use client';

import { useState, FormEvent } from 'react';
import { Form } from './style';
import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';
import { BranchSelect } from '@/src/components/ui/BranchSelect';
import { FormField } from '@/src/components/forms/FormField';

interface OrderFormProps {
  onSubmit: (data: { branchId: string; itemId: string; quantity: number }) => Promise<void>;
  loading?: boolean;
}

export function OrderForm({ onSubmit, loading = false }: OrderFormProps) {
  const [formData, setFormData] = useState({
    branchId: 'BRANCH-001',
    itemId: '',
    quantity: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const quantity = parseInt(formData.quantity);

    try {
      await onSubmit({
        branchId: formData.branchId,
        itemId: formData.itemId,
        quantity,
      });
      // Limpar campos após sucesso (apenas itemId e quantity)
      setFormData((prev) => ({ ...prev, itemId: '', quantity: '' }));
    } catch (error) {
      // Não limpa se houver erro
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormField label="Filial (Branch)" required>
        <BranchSelect
          value={formData.branchId}
          onChange={(branchId) => setFormData({ ...formData, branchId })}
          required
          disabled={loading}
        />
      </FormField>

      <FormField label="ID do Item" required>
        <Input
          type="text"
          placeholder="Ex: ITEM-001"
          value={formData.itemId}
          onChange={(e) => setFormData({ ...formData, itemId: e.target.value })}
          required
        />
      </FormField>

      <FormField label="Quantidade" required>
        <Input
          type="number"
          placeholder="Ex: 10"
          min="1"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          required
        />
      </FormField>

      <Button type="submit" fullWidth disabled={loading}>
        {loading ? 'Criando...' : 'Criar Pedido'}
      </Button>
    </Form>
  );
}

