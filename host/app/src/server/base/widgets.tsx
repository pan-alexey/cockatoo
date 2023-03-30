import React from 'react';
import { WidgetContext } from '../../types';
import { components } from '../__fixtures__/index';
import { loadComponent } from '../regestry/component/module';

export interface GetComponentWidgetProps {
  widgetName: string;
  context: WidgetContext;
  children?: React.ReactElement;
  props?: Record<string, unknown>;
}

export const getComponentWidget = async (widgetProps: GetComponentWidgetProps): Promise<React.ReactElement> => {
  const { widgetName, children = null, context, props = {} } = widgetProps;

  let Component = null;

  if (widgetName === 'widget2') {
    Component = await loadComponent('');
  } else {
    Component = components[widgetName]; // TODO: use registry;
  }

  const Provider = context.provider;
  const useContext = context.hooks;

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
