import React from 'react';
import type { ComponentProps } from '../../../types';
import type { Context1Type } from '../context-1';
import type { Context2Type } from '../context-2';

const Component2: React.FC<ComponentProps> = ({ data, children, contexts }) => {
  return (
    <div>
      <div>Component 2</div>
      <div data-name="context-length">{contexts.length}</div>
      <div data-name="data">{JSON.stringify(data)}</div>
      <div data-name="children">{children}</div>
    </div>
  );
};

export default Component2;
