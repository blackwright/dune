import React from 'react';
import styled from 'styled-components';
import { Dune } from '../Dune';
import { Generator } from '../Generator';
import dune from './dune.png';

export const App: React.FC = () => {
  const [text, setText] = React.useState('All paths lead to darkness.');

  return (
    <StyledBackground>
      <Dune text={text} />
      <Generator onChange={setText} />
    </StyledBackground>
  );
};

const StyledBackground = styled.main`
  background: url(${dune}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: absolute;
  width: 100vw;
  height: 100vh;
`;
