import React from 'react';
import Incoming from './Incoming';
import Outgoing from './Outgoing';
import { createBufferAttributes } from './utils';
import { BufferAttributes } from './types';

type Props = {
  position: Float32Array;
};

type State = {
  incoming?: BufferAttributes;
  outgoing?: BufferAttributes;
};

const Text: React.FC<Props> = ({ position }) => {
  const [state, setState] = React.useState<State>({
    incoming: undefined,
    outgoing: undefined,
  });

  React.useEffect(() => {
    setState((prevState) => {
      const incoming = createBufferAttributes(position);

      return {
        outgoing: prevState.incoming ? prevState.incoming : undefined,
        incoming,
      };
    });
  }, [position]);

  return (
    <>
      {state.incoming && <Incoming attributes={state.incoming} />}
      {state.outgoing && <Outgoing attributes={state.outgoing} />}
    </>
  );
};

export default Text;
