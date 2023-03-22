import { Registry } from '../registry';

import Component1 from '../../__fixtures__/Component1';
import Component2 from '../../__fixtures__/Component2';

export class BaseContext {
  private registry = new Registry();
  constructor() {
    this.registry.loadModule('component1', Component1);
    this.registry.loadModule('component2', Component2);
    console.log('init BaseModule');
  }
}
