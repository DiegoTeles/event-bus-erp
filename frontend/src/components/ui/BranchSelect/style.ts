import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const DropdownItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isNew' && prop !== 'isHighlighted',
})<{ isHighlighted?: boolean; isNew?: boolean }>`
  padding: 10px 12px;
  cursor: pointer;
  background: ${(props) => (props.isHighlighted ? '#f7fafc' : 'white')};
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s;

  &:hover {
    background: #f7fafc;
  }

  &:last-child {
    border-bottom: none;
  }

  ${(props) =>
    props.isNew &&
    `
    font-style: italic;
    color: #718096;
    
    &::before {
      content: '+';
      font-weight: bold;
      color: #667eea;
      margin-right: 4px;
    }
  `}
`;

export const BranchLabel = styled.span`
  font-weight: 500;
  color: #1a202c;
`;

export const BranchType = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'isPilot',
})<{ isPilot?: boolean }>`
  font-size: 12px;
  color: ${(props) => (props.isPilot ? '#22543d' : '#718096')};
  padding: 2px 8px;
  background: ${(props) => (props.isPilot ? '#c6f6d5' : '#e2e8f0')};
  border-radius: 12px;
`;

