import React from 'react';
import styled from 'styled-components';
import { CanvasTextWrapper } from 'canvas-text-wrapper';

type Props = {
  children: string;
  onChange: (imageData: ImageData) => void;
};

export const ImageData: React.FC<Props> = ({ children, onChange }) => {
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    if (wrapperRef.current && canvasRef.current) {
      canvasRef.current.width = wrapperRef.current.clientWidth;
      canvasRef.current.height = wrapperRef.current.clientHeight;
      canvasRef.current.style.width = '100%';
      canvasRef.current.style.height = '100%';

      const ctx = canvasRef.current.getContext('2d')!;
      ctx.fillStyle = 'black';
    }
  });

  React.useEffect(() => {
    if (canvasRef.current) {
      CanvasTextWrapper(canvasRef.current, children, {
        font: '16px "Droid Sans", sans-serif',
        maxFontSizeToFill: 24,
        textAlign: 'center',
        verticalAlign: 'middle',
        sizeToFill: true,
      });

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
  }, [onChange, children]);

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
