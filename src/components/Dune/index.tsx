import React, { useRef, useEffect } from 'react';
import { CanvasWriter, SIDE_PADDING_RATIO } from './canvasWriter';
import { Wind } from './wind';
import { Sand, MAX_DELAY } from './sand';
import { randomNumberBetween } from '../../utils';
import { useDebouncedResize } from '../../utils/hooks';
import './Dune.css';

type Props = {
  text?: string;
};

const FONT = 'normal normal 100 3rem "Times New Roman"';

export function Dune({ text = '' }: Props) {
  const gustCanvasRef = useRef<HTMLCanvasElement>(null);
  const obliterateCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWriterRef = useRef<CanvasWriter>();

  useDebouncedResize(() => {
    const { innerWidth, innerHeight, devicePixelRatio } = window;

    const gustCanvas = gustCanvasRef.current!;
    gustCanvas.width = innerWidth * devicePixelRatio;
    gustCanvas.height = innerHeight * devicePixelRatio;

    const obliterateCanvas = obliterateCanvasRef.current!;
    obliterateCanvas.width = innerWidth * devicePixelRatio;
    obliterateCanvas.height = innerHeight * devicePixelRatio;

    const gustCtx = gustCanvas.getContext('2d')!;
    gustCtx.font = FONT;

    const obliterateCtx = obliterateCanvas.getContext('2d')!;
    obliterateCtx.font = FONT;

    canvasWriterRef.current = new CanvasWriter(gustCtx);
  }, []);

  const gustRafId = useRef<number>();

  useEffect(() => {
    const gustCanvas = gustCanvasRef.current!;
    const gustCtx = gustCanvas.getContext('2d')!;

    const canvasWriter = canvasWriterRef.current!;

    const obliterateCanvas = obliterateCanvasRef.current!;
    const obliterateCtx = obliterateCanvas.getContext('2d')!;

    canvasWriter.clear();
    canvasWriter.write(text);
    const { data } = canvasWriter.getImageData();

    const textSand: Sand[] = [];

    for (let x = 0; x < gustCanvas.width; x++) {
      for (let y = 0; y < gustCanvas.height; y++) {
        if (
          data[(x + y * gustCanvas.width) * 4 + 3] > 0 &&
          Math.random() > 0.55
        ) {
          const randomDelay = randomNumberBetween(
            -MAX_DELAY / 5,
            MAX_DELAY / 5
          );
          const sandDelay =
            ((x - SIDE_PADDING_RATIO * gustCanvas.width) /
              canvasWriter.maxLineWidth!) *
              MAX_DELAY +
            randomDelay;
          textSand.push(new Sand(gustCanvas.width, { x, y }, sandDelay));
        }
      }
    }

    const backgroundSand: Sand[] = [];

    for (let i = 0; i < 4000; i++) {
      const randomDestination = {
        x: gustCanvas.width,
        y: randomNumberBetween(1, gustCanvas.height - 1)
      };

      backgroundSand.push(new Sand(gustCanvas.width, randomDestination));
    }

    const wind = new Wind(gustCanvas.width, textSand, backgroundSand);

    const gust = (now: number) => {
      if (
        wind.numTextGrainsInPlace === textSand.length &&
        !backgroundSand.length
      ) {
        return;
      }

      gustCtx.clearRect(0, 0, gustCanvas.width, gustCanvas.height);
      wind.tick(now);
      wind.render(gustCtx);

      gustRafId.current = window.requestAnimationFrame(gust);
    };

    gustRafId.current = window.requestAnimationFrame(gust);

    return () => {
      if (gustRafId.current) {
        window.cancelAnimationFrame(gustRafId.current);
      }

      // move all text sand to background sand for cleanup
      wind.textSand.forEach(grain => (grain.destination.x = gustCanvas.width));
      wind.backgroundSand = [...wind.textSand, ...wind.backgroundSand];
      wind.textSand = [];

      const obliterate = (now: number) => {
        // keep running in animation loop until all
        // sand is blown to the edge of the canvas
        if (!wind.backgroundSand.length) {
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
      <canvas className="dune" ref={gustCanvasRef} />
      <canvas className="dune" ref={obliterateCanvasRef} />
    </>
  );
}
