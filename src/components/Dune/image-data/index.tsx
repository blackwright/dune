import React from 'react';
import styled from 'styled-components';
import { CanvasTextWrapper } from 'canvas-text-wrapper';

type Props = {
  children: string;
  onChange: (imageData: ImageData) => void;
};

const ImageData: React.FC<Props> = ({ children, onChange }) => {
  const canvas = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    if (canvas.current) {
      canvas.current.width = window.innerWidth;
      canvas.current.height = window.innerHeight;

      const ctx = canvas.current.getContext('2d')!;
      ctx.fillStyle = 'black';
    }
  });

  React.useEffect(() => {
    if (canvas.current) {
      CanvasTextWrapper(canvas.current, children, {
        font: '24px "Droid Sans", sans-serif',
        maxFontSizeToFill: 24,
        textAlign: 'center',
        verticalAlign: 'middle',
        sizeToFill: true,
        paddingX: canvas.current.width / 3,
        paddingY: canvas.current.height / 4,
      });

      const ctx = canvas.current.getContext('2d')!;
      onChange(
        ctx.getImageData(0, 0, canvas.current.width, canvas.current.height)
      );
    }
  }, [onChange, children]);

  return <FullScreenCanvas ref={canvas} />;
};

const FullScreenCanvas = styled.canvas`
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
`;

export default ImageData;
