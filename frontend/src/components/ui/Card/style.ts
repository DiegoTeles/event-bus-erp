import styled from 'styled-components';

export const Card = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'fullHeight',
})<{ fullHeight?: boolean }>`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.fullHeight
      ? 'height: 100%; min-height: 0; overflow: hidden;'
      : 'height: fit-content;'}
`;

export const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 16px;
  flex-shrink: 0;
`;

