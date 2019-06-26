import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { CanvasWriter, SIDE_PADDING_RATIO } from './canvasWriter';
import { Wind } from './wind';
import { Sand, MAX_DELAY, TIME_TO_CROSS } from './sand';
import { randomNumberBetween } from '../../utils';
import { useDebouncedResize } from '../../utils/hooks';

const TEXT_SAND_DENSITY = 0.5;

type Props = {
  text?: string;
};

const FONT = 'normal normal 100 3rem "Roboto Mono"';

const StyledCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledHiddenCanvas = styled(StyledCanvas)`
  display: none;
`;

export function Dune({ text = '' }: Props) {
  const textCanvasRef = useRef<HTMLCanvasElement>(null);
  const gustCanvasRef = useRef<HTMLCanvasElement>(null);
  const obliterateCanvasRef = useRef<HTMLCanvasElement>(null);

  const canvasWriterRef = useRef<CanvasWriter>();
  const gustRafId = useRef<number>();

  useDebouncedResize(() => {
    const { innerWidth, innerHeight, devicePixelRatio } = window;
    const canvasWidth = innerWidth * devicePixelRatio;
    const canvasHeight = innerHeight * devicePixelRatio;

    const textCanvas = textCanvasRef.current!;
    textCanvas.width = canvasWidth;
    textCanvas.height = canvasHeight;

    const gustCanvas = gustCanvasRef.current!;
    gustCanvas.width = canvasWidth;
    gustCanvas.height = canvasHeight;

    const obliterateCanvas = obliterateCanvasRef.current!;
    obliterateCanvas.width = canvasWidth;
    obliterateCanvas.height = canvasHeight;

    const textCtx = textCanvas.getContext('2d')!;
    textCtx.font = FONT;

    const obliterateCtx = obliterateCanvas.getContext('2d')!;
    obliterateCtx.font = FONT;

    canvasWriterRef.current = new CanvasWriter(textCtx);
  }, []);

  useEffect(() => {
    const gustCanvas = gustCanvasRef.current!;
    const gustCtx = gustCanvas.getContext('2d')!;

    const canvasWriter = canvasWriterRef.current!;

    const obliterateCanvas = obliterateCanvasRef.current!;
    const obliterateCtx = obliterateCanvas.getContext('2d')!;

    const sand: Sand[] = [];
    const wind = new Wind(gustCanvas.width, sand);

    canvasWriter.clear();
    canvasWriter.write(text);
    const { data } = canvasWriter.getImageData();

    for (let x = 0; x < gustCanvas.width; x++) {
      for (let y = 0; y < gustCanvas.height; y++) {
        if (
          data[(x + y * gustCanvas.width) * 4 + 3] > 0 &&
          Math.random() > 1 - TEXT_SAND_DENSITY
        ) {
          const sandDelay =
            ((x - SIDE_PADDING_RATIO * gustCanvas.width) /
              canvasWriter.maxLineWidth!) *
              MAX_DELAY +
            randomNumberBetween(-MAX_DELAY / 5, MAX_DELAY / 5);
          sand.push(new Sand(gustCanvas.width, { x, y }, sandDelay));
        }
      }
    }

    window.setTimeout(
      () => {
        const sandCount = sand.length;

        const gust = (now: number) => {
          if (wind.numTextGrainsInPlace === sandCount) {
            return;
          }

          gustCtx.clearRect(0, 0, gustCanvas.width, gustCanvas.height);
          wind.tick(now);
          wind.render(gustCtx);

          gustRafId.current = window.requestAnimationFrame(gust);
        };

        gustRafId.current = window.requestAnimationFrame(gust);
      },
      gustRafId.current ? TIME_TO_CROSS * 2 : 0
    );

    return () => {
      if (gustRafId.current) {
        window.cancelAnimationFrame(gustRafId.current);
      }

      wind.sand.forEach(grain => (grain.destination.x = gustCanvas.width));

      const obliterate = (now: number) => {
        // keep running in animation loop until all
        // sand is blown to the edge of the canvas
        if (!wind.sand.length) {
          return;
        }

        obliterateCtx.clearRect(0, 0, gustCanvas.width, gustCanvas.height);
        wind.tick(now);
        wind.render(obliterateCtx);

        window.requestAnimationFrame(obliterate);
      };

      window.requestAnimationFrame(obliterate);
    };
  }, [text]);

  return (
    <>
      <StyledHiddenCanvas ref={textCanvasRef} />
      <StyledCanvas ref={gustCanvasRef} />
      <StyledCanvas ref={obliterateCanvasRef} />
    </>
  );
}
