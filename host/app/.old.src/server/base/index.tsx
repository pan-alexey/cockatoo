import React from 'react';
import { trycatch } from '../../common/utils/trycatch';
import { renderComponent } from '../render';
// import { Registry } from '../registry';

import Component1 from '../../__fixtures__/Component1';
import Component2 from '../../__fixtures__/Component2';

export interface ModuleItem {
  name: string;
  props: unknown;
  children?: ModuleItem[];
  kindOf?: 'vital' | 'protect' | 'general';
  // elementType?: 'div' | 'span'; // wrapper dom node type
}

export interface ComponentProps {
  data: unknown;
  children?: React.ReactNode;
}

interface BaseComponentRenderProps {
  Component: React.FC<ComponentProps>;
  props: ComponentProps;
  safety?: boolean;
}

const BaseComponentRender = async ({
  Component,
  props,
  safety,
}: BaseComponentRenderProps): Promise<React.ReactElement> => {
  const render = await trycatch(renderComponent(<Component data={props} />));
  console.log(render);
  return <>Base</>;
};

export class BaseModule {
  // private registry = new Registry();
  private componentMap: Record<string, React.FC<ComponentProps>> = {};
  constructor() {
    this.componentMap = {
      component1: Component1,
      component2: Component2,
    };
    // this.registry.loadModule('component1', Component1);
    // this.registry.loadModule('component2', Component2);
    console.log('init BaseModule');
  }

  private BaseComponent = async (modules: ModuleItem[]): Promise<React.ReactElement> => {
    // await new Promise((r) => setTimeout(r, 10_000));
    // modules.map((widget, i) => {
    //   return <BaseWidgetComponent name={widget.name} props={widget.props} slots={widget.slots} key={i} />;
    // });

    const promises = modules.map(async (module) => {
      // const component = await this.registry.getModule(module.name);
      return renderComponent(<Component1 data={module.props} />);
    });

    const components = await Promise.all(promises);
    console.log('components', components);
    // console.log('modules', components);
    return <div>BaseModule</div>;
  };

  // public async renderGraceful({ name, props, children, ctx }: ModuleItem): Promise<React.ReactElement> {
  //   const Component = (await this.registry.getModule(name)) as React.ElementType;
  //   console.log('children', children);

  //   // 1. check if component is context
  //   // 2. push context to ctx
  //   try {
  //     const __html = await renderComponent(<Component props={props} />);
  //     return React.createElement('div', { 'data-name': name, dangerouslySetInnerHTML: { __html } });
  //   } catch (error) {
  //     console.log('err', error);

  //     return <div>error</div>; // TODO Error element
  //   }
  // }

  // public async renderSimple({ name, props }: ModuleItem): Promise<React.ReactElement> {
  //   const Component = (await this.registry.getModule(name)) as React.ElementType;
  //   return React.createElement('div', {}, <Component props={props} />);
  // }

  public async render(modules: ModuleItem[]): Promise<string> {
    const component = await this.BaseComponent(modules);
    return await renderComponent(component);
  }

  // public async render({ name, props, children, ctx }: ModuleItem): Promise<string> {
  //   const Element = await this.renderGraceful({ name, props, children, ctx });

  //   // <TrackerProvider meta="app">
  //   // <div id="app">
  //   //   {layout.map((widget, i) => {
  //   //     return <BaseWidgetComponent name={widget.name} props={widget.props} slots={widget.slots} key={i}/>
  //   //   })}
  //   // </div>
  //   // </TrackerProvider>

  //   return await renderComponent(Element);
  // }
}
