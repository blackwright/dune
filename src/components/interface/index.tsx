import React from 'react';
import styled from 'styled-components';
import { ParagraphCount } from './ParagraphCount';
import { OtherMemory } from './OtherMemory';
import { Copy } from './Copy';
import { NumberOfParagraphs } from 'types';

type Props = {
  text: string;
  count: NumberOfParagraphs;
  onChangeCount: (count: NumberOfParagraphs) => void;
  onGenerate: () => void;
  disabled?: boolean;
};

export const Interface: React.FC<Props> = ({
  text,
  count,
  onChangeCount,
  onGenerate,
  disabled,
}) => (
  <Wrapper>
    <ParagraphCount
      count={count}
      onChange={onChangeCount}
      disabled={disabled}
    />
    <OtherMemory onClick={onGenerate} disabled={disabled}>
      Other Memory
    </OtherMemory>
    <Copy text={text} />
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 32px 0;

  @media screen and (min-width: 768px) {
    padding: 64px 0;
  }
`;
