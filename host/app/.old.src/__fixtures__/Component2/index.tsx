import React from 'react';

export interface ComponentProps {
  data?: unknown;
  children?: React.ReactNode;
}

const Component2: React.FC<ComponentProps> = ({ data, children }) => {
  return (
    <div>
      <div>Component 2</div>
      <div data-name="data">{JSON.stringify(data)}</div>
      <div data-name="children">{children}</div>
    </div>
  );
};

export default Component2;
