import React from 'react';
import { Text } from './Text';
import { LayoutGenerator } from './layoutGenerator';

type Props = {
  canvas: HTMLCanvasElement;
  children: string;
};

const TextLayout: React.FC<Props> = ({ canvas, children }) => {
  const layoutGenerator = React.useMemo(
    () => new LayoutGenerator(canvas.getContext('2d')!),
    [canvas]
  );

  const [text, setText] = React.useState(layoutGenerator.generate(children));

  React.useEffect(() => {
    setText(layoutGenerator.generate(children));
  }, [layoutGenerator, children]);

  return (
    <React.Suspense fallback={null}>
      <Text>{text}</Text>
    </React.Suspense>
  );
};

export default TextLayout;
