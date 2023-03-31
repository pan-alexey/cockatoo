import React from 'react';
import { createRoot } from 'react-dom/client';
import { getWidget1 } from './module';
import App from './App';

(async () => {
  const Component = await getWidget1();

  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(
      <App>
        <Component />
      </App>,
    );
  }
})();
