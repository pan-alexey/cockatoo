import React from 'react';
import { WidgetContext } from '../../types';
import { components } from '../__fixtures__/index';
export interface GetComponentWidgetProps {
  widgetName: string;
  context: WidgetContext;
  children?: React.ReactElement;
  props?: Record<string, unknown>;
}

export const getComponentWidget = (widgetProps: GetComponentWidgetProps): React.ReactElement => {
  const { widgetName, children = null, context, props = {} } = widgetProps;

  const Component = components[widgetName]; // TODO: use registry;

  const Provider = context.provider;
  const useContext = context.hooks;
  console.log('getComponentWidget', context);

  if (Component) {
    return (
      <Provider>
        <Component contexts={useContext} data={props}>
          {children}
        </Component>
      </Provider>
    );
  }

  return <div>widget {widgetName} not found</div>;
};
