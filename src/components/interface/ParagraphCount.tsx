import React from 'react';
import styled from 'styled-components';
import { NumberOfParagraphs } from 'types';

type Props = {
  count: NumberOfParagraphs;
  onChange: (count: NumberOfParagraphs) => void;
  disabled?: boolean;
} & Omit<React.ComponentProps<'div'>, 'onChange'>;

const Component: React.FC<Props> = ({
  className,
  count,
  onChange,
  disabled,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleOpen = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  const handleOptionClick = (value: NumberOfParagraphs) => {
    if (disabled) {
      return;
    }

    onChange(value);
  };

  React.useEffect(() => {
    const handleOutsideClick = (e: Event) => {
      if (ref.current) {
        if (!ref.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div ref={ref} className={className} onClick={toggleOpen}>
      <Wrapper disabled={disabled}>
        {count}
        <Dropdown isOpen={isOpen}>
          {([1, 2, 3, 4] as Array<NumberOfParagraphs>).map((num) => (
            <Option key={num} onClick={() => handleOptionClick(num)}>
              {num}
            </Option>
          ))}
        </Dropdown>
      </Wrapper>
    </div>
  );
};

const Dropdown = styled.ul<{ isOpen: boolean }>`
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  position: absolute;
  top: 38px;
  left: 0;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  transition: all 300ms;
`;

const Option = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  min-width: 36px;
  font-size: 12px;
  line-height: 20px;
  text-transform: uppercase;
  transition: all 300ms;

  :hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Wrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
  padding: 8px 12px;
  min-width: 36px;
  font-size: 12px;
  line-height: 14px;
  text-transform: uppercase;
  border-radius: 4px;
  cursor: pointer;
  transition: all 300ms;

  :hover {
    background: rgba(255, 255, 255, 0.1);
  }

  ${({ disabled }) =>
    !!disabled &&
    `
    &,
    ${Dropdown} {
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    &,
    ${Dropdown},
    ${Option} {
      color: rgba(255, 255, 255, 0.3);
      background: transparent;
    }
  `}
`;

export const ParagraphCount = styled(Component)`
  margin: 0 4px;
  display: flex;
`;
