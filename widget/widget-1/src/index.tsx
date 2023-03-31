import React from 'react';

interface ComponentProps {
  contexts: unknown[];
  data?: unknown;
  children?: React.ReactNode;
}
const name = 'lazy';
const LazyComponent = React.lazy(() => import('./components/' + name));

const Component: React.FC<ComponentProps> = ({ data, children, contexts }) => {
  return (
    <div>
      <div>Component 1</div>
      <div data-name="React lazy:">
        <React.Suspense>
          <LazyComponent />
        </React.Suspense>
      </div>
      <div data-name="children">{children}</div>
      
    </div>
  );
};

export default Component;
