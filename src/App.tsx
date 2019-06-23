import React from 'react';
import { Dune } from './components/Dune';

const App: React.FC = () => {
  const text =
    'Deep in the human unconscious is a pervasive need for a logical universe that makes sense. But the real universe is always one step beyond logic.';
  return <Dune text={text} />;
};

export default App;
