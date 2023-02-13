import React from 'react';
import { renderComponent } from '../render';
import { Registry } from '../registry';

import Component1 from '../../__fixtures__/Component1';
import Component2 from '../../__fixtures__/Component2';

export interface ModuleItem {
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

  public async renderSimple({ name, props }: ModuleItem): Promise<React.ReactElement> {
    const Component = (await this.registry.getModule(name)) as React.ElementType;

    return React.createElement('div', {}, <Component props={props} />);
  }

  public async renderGraceful({ name, props }: ModuleItem): Promise<React.ReactElement> {
    const Component = (await this.registry.getModule(name)) as React.ElementType;

    const __html = await renderComponent(<Component props={props} />);
    return React.createElement('div', { dangerouslySetInnerHTML: { __html } });
  }

  public async render(name: string, props: unknown): Promise<string> {
    const Element = await this.renderGraceful({ name, props });

    return await renderComponent(Element);
  }
}
