import React from 'react';
import styled from 'styled-components';
import Paragraph from './paragraph';

type Props = {
  paragraphs: number;
  minSentences: number;
  maxSentences: number;
  onChange: (text: string) => void;
  disabled?: boolean;
};

export const Generator: React.FC<Props> = ({
  paragraphs,
  minSentences,
  maxSentences,
  onChange,
  disabled,
}) => {
  const paragraphBuilder = React.useMemo(
    () => new Paragraph({ min: minSentences, max: maxSentences }),
    [minSentences, maxSentences]
  );

  const handleClick = () => {
    onChange(
      [...new Array(paragraphs)]
        .map(() => paragraphBuilder.build().toString())
        .join('\n\n')
    );
  };

  return (
    <StyledButton onClick={handleClick} disabled={disabled}>
      Other Memory
    </StyledButton>
  );
};

const StyledButton = styled.button`
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.8);
  padding: 8px 16px;
  font-size: 12px;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  background: transparent;
  outline: 0;
  border-radius: 4px;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
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
