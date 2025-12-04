import styled from 'styled-components';

export const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 4px;

    &:hover {
      background: #a0aec0;
    }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #718096;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

