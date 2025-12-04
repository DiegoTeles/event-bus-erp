import styled from 'styled-components';

export const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${(props) => {
    if (props.status === 'SENT_TO_ERP') return '#c6f6d5';
    if (props.status === 'REJECTED') return '#fed7d7';
    return '#feebc8';
  }};
  color: ${(props) => {
    if (props.status === 'SENT_TO_ERP') return '#22543d';
    if (props.status === 'REJECTED') return '#c53030';
    return '#744210';
  }};
`;

