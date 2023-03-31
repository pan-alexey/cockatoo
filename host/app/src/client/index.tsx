import React from 'react';
import { createRoot } from 'react-dom/client';
import { getWidget1, getWidget2 } from './module';
import { registry } from './base';
import App from './App';

(async () => {
  // const Component1 = await getWidget1();
  // const Component2 = await getWidget2();
  await registry.init();

  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(<App />);
  }
})();
