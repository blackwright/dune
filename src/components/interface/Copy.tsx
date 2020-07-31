import React from 'react';
import styled from 'styled-components';

type Props = {
  text: string;
};

export const Copy: React.FC<Props> = ({ text }) => {
  const handleCopy = () => {
    const textarea = document.createElement('textarea');
    textarea.value = text;

    textarea.style.position = 'fixed';
    textarea.style.height = '0';
    textarea.style.top = '0';
    textarea.style.left = '0';

    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  return (
    <Wrapper onClick={handleCopy}>
      <svg
        width={12}
        height={12}
        x="0px"
        y="0px"
        viewBox="0 0 210.107 210.107"
        fill="currentColor"
      >
        <path
          color="#fff"
          d="M168.506,0H80.235C67.413,0,56.981,10.432,56.981,23.254v2.854h-15.38
          c-12.822,0-23.254,10.432-23.254,23.254v137.492c0,12.822,10.432,23.254,23.254,23.254h88.271
          c12.822,0,23.253-10.432,23.253-23.254V184h15.38c12.822,0,23.254-10.432,23.254-23.254V23.254C191.76,10.432,181.328,0,168.506,0z
          M138.126,186.854c0,4.551-3.703,8.254-8.253,8.254H41.601c-4.551,0-8.254-3.703-8.254-8.254V49.361
          c0-4.551,3.703-8.254,8.254-8.254h88.271c4.551,0,8.253,3.703,8.253,8.254V186.854z M176.76,160.746
          c0,4.551-3.703,8.254-8.254,8.254h-15.38V49.361c0-12.822-10.432-23.254-23.253-23.254H71.981v-2.854
          c0-4.551,3.703-8.254,8.254-8.254h88.271c4.551,0,8.254,3.703,8.254,8.254V160.746z"
        />
      </svg>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  padding: 8px 12px;
  min-width: 36px;
  margin: 0 4px;
  cursor: pointer;

  :hover {
    background: rgba(255, 255, 255, 0.1);
  }

  :active {
    background: rgba(255, 255, 255, 0.2);
  }
`;
