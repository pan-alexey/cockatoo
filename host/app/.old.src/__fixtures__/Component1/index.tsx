import React from 'react';

const LazyComponent = React.lazy(() => import('./lazy'));

export interface ComponentProps {
  data?: unknown;
  children?: React.ReactNode;
}

const Component1: React.FC<ComponentProps> = () => {
  return (
    <div>
      Component1{' '}
      <code>
        <React.Suspense>
          <LazyComponent />
        </React.Suspense>
      </code>
    </div>
  );
};

export default Component1;
