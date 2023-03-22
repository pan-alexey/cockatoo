import React from 'react';
import { contexts } from './index';
import { components } from './index';

export const App: React.FC = () => {
  const { Context1, Context2 } = contexts;
  const { Component1, Component2 } = components;

  return (
    <div>
      {/* <Context1.Provider props={{}}>
        <Component1 contexts={[Context1.useContext]} />
        <Context2.Provider props={{}}>
          <Component2 contexts={[Context1.useContext, Context2.useContext]} />
        </Context2.Provider>
      </Context1.Provider> */}
    </div>
  );
};
