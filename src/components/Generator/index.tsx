import React from 'react';
import styled from 'styled-components';
import Sentence from './sentence';

type Props = {
  onGenerate: (text: string) => void;
};

export const Generator: React.FC<Props> = ({ onGenerate }) => {
  const handleClick = () => {
    const sentence = new Sentence().toString();
    onGenerate(sentence);
  };

  return <StyledButton onClick={handleClick}>Test</StyledButton>;
};

const StyledButton = styled.button`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translate3d(-50%, 0 0);
`;
