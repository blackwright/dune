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
  const paragraphBuilder = React.useMemo(
    () => new Paragraph({ min: minSentences, max: maxSentences }),
    [minSentences, maxSentences]
  );

  const handleClick = () => {
    onChange(
      [...new Array(paragraphs)]
        .map(() => paragraphBuilder.build().toString())
        .join('\n\n')
    );
  };

  return children(handleClick);
};
