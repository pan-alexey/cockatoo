import React from 'react';
import { renderComponent } from '../render';
import { Registry } from '../registry';

import Component1 from '../../__fixtures__/Component1';
import Component2 from '../../__fixtures__/Component2';

interface RenderGraceful {
  name: string;
  props: unknown;
  elementType?: 'div' | 'span';
}

export class BaseModule {
  private registry = new Registry();
  constructor() {
    this.registry.loadModule('component1', Component1);
    this.registry.loadModule('component2', Component2);
    console.log('init BaseModule');
  }

  public async renderSimple({ name, props }: RenderGraceful): Promise<React.ReactElement> {
    const Component = (await this.registry.getModule(name)) as React.ElementType;

    return React.createElement('div', {}, <Component props={props} />);
  }

  public async renderGraceful({ name, props }: RenderGraceful): Promise<React.ReactElement> {
    const Component = (await this.registry.getModule(name)) as React.ElementType;

    const __html = await renderComponent(<Component props={props} />);
    return React.createElement('div', { dangerouslySetInnerHTML: { __html } });
  }

  public async render(name: string, props: unknown): Promise<string> {
    const Element = await this.renderGraceful({ name, props });

    return await renderComponent(Element);
  }
}

// export const BaseModule = async (props: unknown): Promise<React.ReactElement<any>> => {
//   try {
//     const __html = await renderComponent(<div>{}</div>);
//     const name = 'Name';
//     // Рендерим слоты и превращаем их компонент;
//     // т/к модуль ожидает не строки, а React.ReactElement
//     // const hrtimeStart = process.hrtime();
//     // const tracker = useTracker();
//     // const WidgetComponent = remoteWidgetSingleton.getWidgetComponent(name);
//     // try {
//     //   // render slots
//     //   const inputSlots = slots || {};
//     //   const slotsElements: Record<string, React.ReactElement<any>[]> = {};
//     //   Object.keys(inputSlots).forEach((name, i)=>{
//     //     slotsElements[name] = inputSlots[name].map((widget) => {
//     //       // todo fix key
//     //       return <BaseWidgetServer name={widget.name} {...widget} key={i} parrentSlotName={name}/>
//     //     })
//     //   });
//     //   const __html = renderToString(
//     //     // Because of call renderToString, the contest needs to be forwarded
//     //     <TrackerProvider {...tracker}>
//     //       <WidgetComponent props={props} slots={slotsElements}/>
//     //     </TrackerProvider>
//     //   );
//     //   console.log('parrentSlotName', parrentSlotName, tracker.meta);
//     //   return <div className='widget' data-widget-name={name} dangerouslySetInnerHTML={{ __html }} />;
//   } catch (e) {
//     return <div data-widget-name={name}>{`<!-- erorr render widgetName-->`}</div>;
//   }
// };
