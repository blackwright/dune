import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Dune } from '../Dune';
import dune from './dune.png';

const StyledBackground = styled.main`
  background: url(${dune}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const App: React.FC = () => {
  const [text, setText] = useState('The spice must flow.');

  useEffect(() => {
    window.setTimeout(
      () =>
        setText('I’m sorry, Grandfather. You’ve met the Atreides gom jabbar.'),
      3000
    );

    window.setTimeout(() => setText('Thus spoke St. Alia of the Knife.'), 8000);
  }, []);

  return (
    <StyledBackground>
      <Dune text={text} />
    </StyledBackground>
  );
};

export default App;
