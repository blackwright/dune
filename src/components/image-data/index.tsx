import React from 'react';
import styled from 'styled-components';
import { Writer } from './writer';

type Props = {
  children: string;
  onChange: (imageData: ImageData) => void;
};

export const ImageData: React.FC<Props> = ({ children, onChange }) => {
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const [writer, setWriter] = React.useState<Writer | null>(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      setWriter(
        new Writer(canvasRef.current, {
          font: '16px "Droid Sans", sans-serif',
          maxFontSizeToFill: 60,
          textAlign: 'center',
          verticalAlign: 'middle',
          sizeToFill: true,
          paddingX: 20,
          paddingY: 20,
        })
      );
    }
  }, []);

  React.useEffect(() => {
    if (wrapperRef.current && canvasRef.current) {
      canvasRef.current.width = wrapperRef.current.clientWidth;
      canvasRef.current.height = wrapperRef.current.clientHeight;
      canvasRef.current.style.width = '100%';
      canvasRef.current.style.height = '100%';

      const ctx = canvasRef.current.getContext('2d')!;
      ctx.fillStyle = 'white';
    }
  });

  React.useEffect(() => {
    if (canvasRef.current && writer) {
      writer.write(children);

      const ctx = canvasRef.current.getContext('2d')!;

      onChange(
        ctx.getImageData(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        )
      );
    }
  }, [onChange, children, writer]);

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
