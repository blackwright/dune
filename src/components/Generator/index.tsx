import React from 'react';
import Paragraph from './paragraph';

type Props = {
  paragraphs: number;
  minSentences: number;
  maxSentences: number;
  onChange: (text: string) => void;
  children: (onClick: () => void) => React.ReactElement;
};

export const Generator: React.FC<Props> = ({
  paragraphs,
  minSentences,
  maxSentences,
  onChange,
  children,
}) => {
  const initialRenderRef = React.useRef(true);

  const prevParagraphsRef = React.useRef(paragraphs);

  const paragraphBuilder = React.useMemo(
    () => new Paragraph({ min: minSentences, max: maxSentences }),
    [minSentences, maxSentences]
  );

  const generate = React.useCallback((count) => {
    return [...new Array(count)]
      .map(() => paragraphBuilder.build().toString())
      .join('\n\n');
  }, []);

  React.useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      return;
    }

    if (prevParagraphsRef.current === paragraphs) {
      return;
    }

    onChange(generate(paragraphs));
    prevParagraphsRef.current = paragraphs;
  }, [paragraphs, onChange, generate]);

  const handleClick = () => {
    onChange(generate(paragraphs));
  };

  return children(handleClick);
};
