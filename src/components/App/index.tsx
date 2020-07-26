import React from 'react';
import styled from 'styled-components';
import Dune from '../Dune';
import Generator from '../Generator';
import dune from './dune.png';

export const App: React.FC = () => {
  const [text, setText] = React.useState('All paths lead to darkness.');

  const [isRendering, setIsRendering] = React.useState(true);

  const handleChange = (newText: string) => {
    if (isRendering) {
      return;
    }

    setIsRendering(true);
    setText(newText);
  };

  const handleComplete = React.useCallback(() => setIsRendering(false), []);

  return (
    <StyledBackground>
      <Dune text={text} isRendering={isRendering} onComplete={handleComplete} />
      <Generator
        min={1}
        max={3}
        onChange={handleChange}
        disabled={isRendering}
      />
    </StyledBackground>
  );
};

const StyledBackground = styled.main`
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: absolute;
  width: 100vw;
  height: 100vh;
`;
