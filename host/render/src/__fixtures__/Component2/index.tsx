import React from 'react';

const Component2: React.FC<{ data: unknown }> = (props) => {
  return (
    <div>
      Component2<code>{JSON.stringify(props)}</code>
      <div data-test="child"></div>
    </div>
  );
};

export default Component2;
