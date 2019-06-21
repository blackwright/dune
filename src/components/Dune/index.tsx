import React, { useRef, useEffect } from 'react';
import { Wind } from './wind';
import { Sand } from './sand';
import { randomNumberBetween } from '../../utils';
import { useDebouncedResize } from '../../utils/hooks';
import './Dune.css';

type Props = {
  text?: string;
};

export function Dune({ text = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useDebouncedResize(() => {
    const canvas = canvasRef.current!;

    const { innerWidth, innerHeight, devicePixelRatio } = window;
    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = innerHeight * devicePixelRatio;
  }, []);

  const rafIdRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = 'black';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = 'normal normal 100 3rem "Roboto Mono"';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const sand: Sand[] = [];

    for (let x = 0; x < canvas.width; x++) {
      for (let y = 0; y < canvas.height; y++) {
        if (data[(x + y * canvas.width) * 4 + 3] > 0 && Math.random() > 0.5) {
          sand.push(new Sand(canvas.width, { x, y }));
        }
      }
    }

    for (let i = 0; i < 10000; i++) {
      const randomDestination = {
        x: canvas.width,
        y: randomNumberBetween(1, canvas.height - 1)
      };
      sand.push(new Sand(canvas.width, randomDestination));
    }

    const wind = new Wind(canvas.width, sand);

    const blow = (now: number) => {
      if (!wind.isBlowing) {
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      wind.tick(now);
      sand.forEach(grain =>
        ctx.fillRect(grain.position.x, grain.position.y, 2, 1)
      );

      rafIdRef.current = window.requestAnimationFrame(blow);
    };

    rafIdRef.current = window.requestAnimationFrame(blow);

    return () => {
      if (rafIdRef.current) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [text]);

  return <canvas className="dune" ref={canvasRef} />;
}
