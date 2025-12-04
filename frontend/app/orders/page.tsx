'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/src/components/ProtectedRoute';
import { useAuth } from '@/src/contexts/AuthContext';
import { useToast } from '@/src/contexts/ToastContext';
import { apiService } from '@/src/services/api';
import { Container, Content, Header } from '@/src/components/layout';
import { Card } from '@/src/components/ui';
import { OrderForm } from '@/src/components/forms';
import { OrderList } from '@/src/components/orders';
import { Button } from '@/src/components/ui';

function OrdersPageContent() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const { success, error } = useToast();
  const router = useRouter();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await apiService.getOrders();
      setOrders(data);
    } catch (err: any) {
      console.error('Erro ao carregar orders:', err);
    }
  };

  const handleSubmit = async (data: { branchId: string; itemId: string; quantity: number }) => {
    setLoading(true);

    try {
      if (data.quantity <= 0) {
        error('Quantidade deve ser maior que zero');
        setLoading(false);
        return;
      }

      await apiService.createOrder(data);
      success('Pedido criado com sucesso!');
      await loadOrders();
    } catch (err: any) {
      error(err.response?.data?.message || 'Erro ao criar pedido');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <Container>
      <Header
        title="Gestão de Pedidos"
        actions={
          <Button variant="secondary" onClick={handleLogout}>
            Sair
          </Button>
        }
      />

      <Content>
        <Card title="Criar Novo Pedido">
          <OrderForm
            onSubmit={handleSubmit}
            loading={loading}
          />
        </Card>

        <Card title="Lista de Pedidos" fullHeight>
          <OrderList orders={orders} />
        </Card>
      </Content>
    </Container>
  );
}

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <OrdersPageContent />
    </ProtectedRoute>
  );
}
