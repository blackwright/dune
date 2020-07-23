import React from 'react';
import styled from 'styled-components';
import Paragraph from './paragraph';

type Props = {
  min: number;
  max: number;
  onChange: (text: string) => void;
};

const Generator: React.FC<Props> = ({ min, max, onChange }) => {
  const paragraph = React.useMemo(() => new Paragraph({ min, max }), [
    min,
    max,
  ]);

  const handleClick = () => {
    onChange(paragraph.build().toString());
  };

  return <StyledButton onClick={handleClick}>Test</StyledButton>;
};

const StyledButton = styled.button`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translate3d(-50%, 0 0);
`;

export default Generator;
