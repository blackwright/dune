import React from 'react';
import * as THREE from 'three';
import { useLoader } from 'react-three-fiber';
import Incoming from './Incoming';
import Outgoing from './Outgoing';
import { createBufferAttributes } from './utils';
import { BufferAttributes } from './types';

type Props = {
  children: string;
};

type State = {
  incoming?: BufferAttributes;
  outgoing?: BufferAttributes;
};

const Text: React.FC<Props> = ({ children }) => {
  const font = useLoader(THREE.FontLoader, '/droid_sans_mono.json');

  const [state, setState] = React.useState<State>({
    incoming: undefined,
    outgoing: undefined,
  });

  React.useEffect(() => {
    setState((prevState) => {
      console.warn('creating buffer attributes for text:', children);

      const incoming = createBufferAttributes(font, children);

      return {
        outgoing: prevState.incoming ? prevState.incoming : undefined,
        incoming,
      };
    });
  }, [font, children]);

  return (
    <>
      {state.incoming && <Incoming attributes={state.incoming} />}
      {state.outgoing && <Outgoing attributes={state.outgoing} />}
    </>
  );
};

export default Text;
