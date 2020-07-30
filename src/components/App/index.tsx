import React from 'react';
import styled from 'styled-components';
import { MathUtils } from 'three';
import { Dune } from 'components/dune';
import { Generator } from 'components/generator';
import { ImageData } from 'components/image-data';
import { Interface } from 'components/interface';
import { getRandomQuote } from 'components/generator/words';
import { NumberOfParagraphs } from 'types';

export const App: React.FC = () => {
  const [count, setCount] = React.useState<NumberOfParagraphs>(1);

  const [text, setText] = React.useState(getRandomQuote());

  const [position, setPosition] = React.useState<Float32Array | null>(null);

  const [isRendering, setIsRendering] = React.useState(true);

  const handleImageData = React.useCallback(
    (imageData: ImageData, particleGap: number) => {
      // canvas image data is a one-dimensional array of RGBA values per pixel
      const pointCoords: number[] = [];

      let i = 0;

      while (i < imageData.data.length) {
        const alpha = imageData.data[i + 3];

        if (alpha > 0) {
          const x = ((i / 4) % imageData.width) - imageData.width / 2;
          const y = -((i / 4 - x) / imageData.width - imageData.height / 2);

          pointCoords.push(x, y - 45, 0);
        }

        i += MathUtils.randInt(1, particleGap) * 4;
      }

      setPosition(Float32Array.from(pointCoords));
    },
    []
  );

  const handleComplete = React.useCallback(() => setIsRendering(false), []);

  const handleChange = (newText: string) => {
    if (isRendering) {
      return;
    }

    setIsRendering(true);
    setText(newText);
  };

  return (
    <StyledBackground>
      {position && (
        <Dune
          position={position}
          isRendering={isRendering}
          onComplete={handleComplete}
        />
      )}
      <Generator
        paragraphs={count}
        minSentences={1}
        maxSentences={2}
        onChange={handleChange}
      >
        {(onGenerate) => (
          <InterfaceWrapper>
            <Interface
              count={count}
              onChangeCount={setCount}
              onGenerate={onGenerate}
              disabled={isRendering}
            />
            <ImageData text={text} onChange={handleImageData} />
          </InterfaceWrapper>
        )}
      </Generator>
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

const InterfaceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  padding: 24px 48px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
