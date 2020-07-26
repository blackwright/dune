import React from 'react';
import styled from 'styled-components';
import { Dune } from '../Dune';
import { Generator } from '../Generator';
import { getRandomQuote } from '../Generator/words';

export const App: React.FC = () => {
  const [text, setText] = React.useState(getRandomQuote());

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
        paragraphs={2}
        minSentences={1}
        maxSentences={3}
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
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;
