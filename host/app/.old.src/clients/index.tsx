import React from 'react';
import ReactDOM from 'react-dom';
import { State } from '../types/.index';

const App: React.FC<{ state: State }> = ({ state }) => {
  return <div>{JSON.stringify(state)}</div>;
};

(async () => {
  const state = (window as unknown as { __state__: State }).__state__;

  // client render or hydrate
  const root = document.getElementById('root');
  if (root?.hasChildNodes()) {
    ReactDOM.hydrate(<App state={state} />, document.getElementById('root'));
  } else {
    ReactDOM.render(<App state={state} />, root);
  }
})();
