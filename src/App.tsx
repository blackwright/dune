import React, { useState, useEffect } from 'react';
import { Dune } from './components/Dune';

const App: React.FC = () => {
  const [text, setText] = useState('The spice must flow.');

  useEffect(() => {
    window.setTimeout(
      () =>
        setText('I’m sorry, Grandfather. You’ve met the Atreides gom jabbar.'),
      3000
    );

    window.setTimeout(() => setText('Thus spoke St. Alia of the Knife.'), 8000);
  }, []);

  return <Dune text={text} />;
};

export default App;
