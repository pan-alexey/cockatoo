import React from 'react';

interface ComponentProps {
  contexts: unknown[];
  data?: unknown;
  children?: React.ReactNode;
}

const Component: React.FC<ComponentProps> = ({ data, children, contexts }) => {
  const name = 'lazy';
  const LazyComponent = React.lazy(() => import('./components/' + name));
  LazyComponent

  return (
    <div>
      <div>Component 2</div>
      {/* <div data-name="context-length">{contexts.length}</div>
      <div data-name="data">{JSON.stringify(data)}</div> */}
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
