import React from 'react';
import { Incoming } from './Incoming';
import { Outgoing } from './Outgoing';
import { createBufferAttributes } from './utils';
import type { BufferAttributes } from './types';

type Props = {
  position: Float32Array;
  onComplete?: () => void;
};

type State = {
  incoming?: BufferAttributes;
  outgoing?: BufferAttributes;
  maxVisibleTime?: number;
};

export const Text: React.FC<Props> = ({ position, onComplete }) => {
  const [state, setState] = React.useState<State>({
    incoming: undefined,
    outgoing: undefined,
    maxVisibleTime: undefined,
  });

  React.useEffect(() => {
    setState((prevState) => {
      const { attributes: incoming, maxVisibleTime } = createBufferAttributes(
        position
      );

      return {
        outgoing: prevState.incoming ? prevState.incoming : undefined,
        incoming,
        maxVisibleTime,
      };
    });
  }, [position]);

  return (
    <>
      {state.incoming && state.maxVisibleTime && (
        <Incoming
          attributes={state.incoming}
          maxVisibleTime={state.maxVisibleTime}
          onComplete={onComplete}
        />
      )}
      {state.outgoing && <Outgoing attributes={state.outgoing} />}
    </>
  );
};
