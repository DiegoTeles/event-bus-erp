import { StatusBadge as StyledStatusBadge } from './style';

interface StatusBadgeProps {
  status: 'CREATED' | 'SENT_TO_ERP' | 'REJECTED';
}

const statusLabels: Record<string, string> = {
  CREATED: 'Criado',
  SENT_TO_ERP: 'Enviado ao ERP',
  REJECTED: 'Rejeitado',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <StyledStatusBadge status={status}>{statusLabels[status] || status}</StyledStatusBadge>;
}

