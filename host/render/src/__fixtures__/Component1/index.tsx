import React from 'react';

const LazyComponent = React.lazy(() => import('./lazy'));

const Component1: React.FC = () => {
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
