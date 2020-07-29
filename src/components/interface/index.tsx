import React from 'react';
import styled from 'styled-components';
import { ParagraphCount } from './ParagraphCount';
import { OtherMemory } from './OtherMemory';

type Props = {
  count: number;
  onChangeCount: (count: number) => void;
  onGenerate: () => void;
  disabled?: boolean;
};

export const Interface: React.FC<Props> = ({
  count,
  onChangeCount,
  onGenerate,
  disabled,
}) => (
  <Wrapper>
    <ParagraphCount count={count} onChange={onChangeCount} />
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
