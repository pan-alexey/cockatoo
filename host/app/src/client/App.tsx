import React from 'react';
import { registry } from './base';
import { Widget3 } from './components/widget-3';
export type State = unknown;

export const App: React.FC<{ children: React.ReactNode }> = () => {
  const Widget1 = registry.get('widget1');
  const Widget2 = registry.get('widget2');

  return (
    <div data-name="app">
      <div>
        <Widget3 />
      </div>
      <div>test</div>
      <div>
        <Widget1>
          <div>Widget1</div>
          <Widget2>Widget2</Widget2>
        </Widget1>
      </div>
    </div>
  );
};

export default App;
