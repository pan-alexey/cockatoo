import React from 'react';
import { BaseModule } from './base';

const fixture = [
  {
    name: 'component1',
    props: { test: '1' },
  },
  {
    name: 'component2',
    props: { test: '1' },
  },
  {
    name: 'component1',
    props: { test: '1' },
    children: [
      {
        name: 'component1',
        props: { test: '1' },
      },
      {
        name: 'component2',
        props: { test: '1' },
      },
    ],
  },
  {
    name: 'component1',
    props: { test: '1' },
  },
];

export class Render {
  private baseModule = new BaseModule();

  public async render() {
    console.log('render');
    const component1 = await this.baseModule.render('component1', {});
    console.log('component1', component1);
    const component2 = await this.baseModule.render('component2', { data: '😀)' });
    console.log('component2', component2);
  }
}
