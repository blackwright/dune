import React from 'react';
import styled from 'styled-components';
import { Writer } from './writer';
import { getParticleGap } from './utils';
import { NumberOfParagraphs } from 'types';

type Props = {
  paragraphs: NumberOfParagraphs;
  text: string;
  onChange: (imageData: ImageData, particleGap: number) => void;
};

export const ImageData: React.FC<Props> = ({ paragraphs, text, onChange }) => {
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const [writer, setWriter] = React.useState<Writer | null>(null);

  React.useEffect(() => {
    if (wrapperRef.current && canvasRef.current) {
      canvasRef.current.width = wrapperRef.current.clientWidth;
      canvasRef.current.height = wrapperRef.current.clientHeight;
    }
  }, []);

  React.useEffect(() => {
    if (canvasRef.current) {
      setWriter(
        new Writer(canvasRef.current, {
          font: '16px "Tiempos Text", "Times New Roman", serif',
          maxFontSizeToFill: 77,
          textAlign: 'center',
          verticalAlign: 'middle',
          sizeToFill: true,
        })
      );
    }
  }, []);

  React.useEffect(() => {
    if (canvasRef.current && writer) {
      const { width, height } = canvasRef.current;

      writer.write(text);

      onChange(
        writer.ctx.getImageData(0, 0, width, height),
        getParticleGap(paragraphs, width * height)
      );

      writer.ctx.clearRect(0, 0, width, height);
    }
    // eslint-disable-next-line
  }, [onChange, text, writer]);

  return (
    <CanvasWrapper ref={wrapperRef}>
      <canvas ref={canvasRef} />
    </CanvasWrapper>
  );
};

const CanvasWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  visibility: hidden;
`;
