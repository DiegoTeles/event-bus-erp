import styled from 'styled-components';

export const OrderItem = styled.div`
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  transition: border-color 0.2s;

  &:hover {
    border-color: #667eea;
  }
`;

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const OrderId = styled.span`
  font-weight: 600;
  color: #1a202c;
  font-size: 14px;
`;

export const OrderDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  font-size: 13px;
  color: #718096;
`;

