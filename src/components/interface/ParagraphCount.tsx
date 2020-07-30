import React from 'react';
import styled from 'styled-components';
import { NumberOfParagraphs } from 'types';

type Props = {
  count: NumberOfParagraphs;
  onChange: (count: NumberOfParagraphs) => void;
} & Omit<React.ComponentProps<'div'>, 'onChange'>;

const Component: React.FC<Props> = ({ className, count, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleOpen = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  return (
    <div className={className} onClick={toggleOpen}>
      <Wrapper>
        {count}
        <Dropdown isOpen={isOpen}>
          {([1, 2, 3, 4] as Array<NumberOfParagraphs>).map((num) => (
            <Option key={num} onClick={() => onChange(num)}>
              {num}
            </Option>
          ))}
        </Dropdown>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
  top: 8px;
  padding: 8px 16px;
  font-size: 12px;
  line-height: 14px;
  text-transform: uppercase;
  border-radius: 4px;
  cursor: pointer;
  transition: all 300ms;

  :hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Dropdown = styled.ul<{ isOpen: boolean }>`
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  position: absolute;
  top: 38px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  transition: all 300ms;
`;

const Option = styled.li`
  padding: 8px 16px;
  font-size: 12px;
  line-height: 20px;
  text-transform: uppercase;

  :hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const ParagraphCount = styled(Component)`
  padding-bottom: 16px;
  margin-right: 8px;
`;
