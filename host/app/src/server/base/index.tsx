import React from 'react';
import { RemoteWidget } from '../../types';
import { WidgetContext } from '../../types';
import { getWidgetInfo } from '../../common/widget/getInfo';
import { getComponentWidget } from './widgets';
import { makeContext } from './context';
import { renderComponent } from '../render';
import { Context as RootContext } from '../../common/context/root';

const rootContext: WidgetContext = {
  provider: RootContext.Provider,
  hooks: [RootContext.useContext],
};

export const renderWidgets = async (widgets: RemoteWidget[], context: WidgetContext): Promise<string> => {
  let result: string[] = [];

  // TODO promise all
  for (let i = 0; i < widgets.length; i++) {
    const widget = widgets[i];
    const widgetInfo = getWidgetInfo(widget.name);
    if (!widgetInfo) continue;

    if (widgetInfo.type === 'widget') {
      const widgetName = widgetInfo.name;

      const children = widget.children ? await renderWidgets(widget.children, context) : '';

      const item = {
        widgetName,
        context,
        props: widget.props,
        children: <div dangerouslySetInnerHTML={{ __html: children }} />,
      };

      // add context to widget in this;
      const html = await renderComponent(getComponentWidget(item));
      result.push(html);
    }

    // Make new context
    if (widgetInfo.type === 'context') {
      const contextName = widgetInfo.name;

      const newContext = makeContext({
        parentContext: context,
        currentContext: {
          name: contextName,
          props: widget.props,
        },
      });

      const newResult: string = widget.children ? await renderWidgets(widget.children, newContext) : '';
      result = [...result, newResult];
    }
  }

  // todo stream render widget
  return result.join('');
};

export const renderApp = (widgets: RemoteWidget[]) => {
  return renderWidgets(widgets, rootContext);
};
