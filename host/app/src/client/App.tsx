import React from 'react';
import { Widget1 } from './components/widget-1';
export type State = unknown;

export const App: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div data-name="app">
      <div>
        <Widget1 />
      </div>
      <div>test</div>
      <div>{children}</div>
    </div>
  );
};

export default App;
