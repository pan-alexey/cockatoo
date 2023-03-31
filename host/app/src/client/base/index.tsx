import React from 'react';
import { getWidget1, getWidget2 } from '../module/index';

const NotFound: React.FC = () => {
  return <div>NotFound</div>;
};

export class WidgetRegistry {
  private elements: Record<string, React.ElementType> = {};
  // constructor() {};

  public async init(): Promise<void> {
    this.elements['widget1'] = await getWidget1();
    this.elements['widget2'] = await getWidget2();
  }

  public get(name: string): React.ElementType {
    if (this.elements[name]) {
      return this.elements[name];
    }

    const component: React.ElementType = NotFound;

    return component;
  }
}

export const registry = new WidgetRegistry();
