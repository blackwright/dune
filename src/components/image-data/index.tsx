import React from 'react';
import styled from 'styled-components';
import { CanvasTextWrapper } from 'canvas-text-wrapper';

type Props = {
  children: string;
  onChange: (imageData: ImageData) => void;
};

export const ImageData: React.FC<Props> = ({ children, onChange }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;

      const ctx = canvasRef.current.getContext('2d')!;
      ctx.fillStyle = 'black';
    }
  });

  React.useEffect(() => {
    if (canvasRef.current) {
      CanvasTextWrapper(canvasRef.current, children, {
        font: '12px "Droid Sans", sans-serif',
        maxFontSizeToFill: 24,
        textAlign: 'center',
        verticalAlign: 'middle',
        sizeToFill: true,
        paddingX: canvasRef.current.width / 3,
        paddingY: canvasRef.current.height / 3,
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

  return <FullScreenCanvas ref={canvasRef} />;
};

const FullScreenCanvas = styled.canvas`
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
`;
