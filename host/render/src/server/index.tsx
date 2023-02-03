import React from 'react';
import { BaseModule, ModuleItem } from './base';

const fixture = [
  {
    name: 'component1',
    props: { data: '😀)' },
  },
  {
    name: 'component2',
    props: { data: '😀)' },
  },
  {
    name: 'component1',
    props: { data: '😀)' },
    children: [
      {
        name: 'component1',
        props: { data: '😀)' },
      },
      {
        name: 'component2',
        props: { data: '😀)' },
      },
    ],
  },
  {
    name: 'component1',
    props: { data: '😀)' },
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

    const promises = fixture.map((moduleItem) => {
      
    })
  }
}
