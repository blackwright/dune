import React from 'react';
import styled from 'styled-components';
import Sentence from './sentence';

const StyledButton = styled.button`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translate3d(-50%, 0 0);
`;

const Generator: React.FC = () => {
  const generate = () => {
    const sentence = new Sentence().toString();
    console.log('sentence: ', sentence);
  };

  return <StyledButton onClick={generate}>Test</StyledButton>;
};

export default Generator;
