import React from 'react';
import styled from 'styled-components';
import { CanvasTextWrapper } from 'canvas-text-wrapper';

type Props = {
  children: string;
  onImageData: (imageData: ImageData) => void;
};

const Layout: React.FC<Props> = ({ children, onImageData }) => {
  const canvas = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    if (canvas.current) {
      canvas.current.width = window.innerWidth;
      canvas.current.height = window.innerHeight;

      const ctx = canvas.current.getContext('2d')!;
      ctx.fillStyle = 'black';
      ctx.font = 'Droid Sans';
    }
  });

  React.useEffect(() => {
    if (canvas.current) {
      CanvasTextWrapper(canvas.current, children, {
        font: '36px "Droid Sans", sans-serif',
        maxFontSizeToFill: 40,
        textAlign: 'center',
        verticalAlign: 'middle',
        sizeToFill: true,
        paddingX: canvas.current.width / 5,
        paddingY: canvas.current.height / 4,
      });

      const ctx = canvas.current.getContext('2d')!;
      onImageData(
        ctx.getImageData(0, 0, canvas.current.width, canvas.current.height)
      );
    }
  }, [onImageData, children]);

  return <FullScreenCanvas ref={canvas} />;
};

const FullScreenCanvas = styled.canvas`
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
`;

export default Layout;
