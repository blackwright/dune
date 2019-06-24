import React, { useState, useEffect } from 'react';
import { Dune } from './components/Dune';

const App: React.FC = () => {
  const [text, setText] = useState('Harkonnen');

  useEffect(() => {
    window.setTimeout(() => setText('Atreides'), 2000);
  }, []);

  return <Dune text={text} />;
};

export default App;
