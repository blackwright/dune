import styled from 'styled-components';

export const OtherMemory = styled.button`
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.8);
  max-width: 200px;
  padding: 8px 16px;
  margin: 0 4px;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  background: transparent;
  outline: 0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 300ms;

  :hover {
    background: rgba(255, 255, 255, 0.1);
  }

  :active {
    background: rgba(255, 255, 255, 0.2);
  }

  :disabled {
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: rgba(255, 255, 255, 0.3);
    background: transparent;
  }
`;
