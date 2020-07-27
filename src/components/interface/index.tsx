import React from 'react';
import styled from 'styled-components';
import { OtherMemory } from './OtherMemory';

type Props = {
  onGenerate: () => void;
  disabled?: boolean;
};

export const Interface: React.FC<Props> = ({ onGenerate, disabled }) => (
  <Wrapper>
    <OtherMemory onClick={onGenerate} disabled={disabled}>
      Other Memory
    </OtherMemory>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  height: 100px;
`;
