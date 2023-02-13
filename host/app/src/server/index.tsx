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
    const components = [
      this.baseModule.render('component2', { data: '😀' }),
      this.baseModule.render('component1', {}),
      this.baseModule.render('component2', { data: '🤪' }),
    ];

    const results = await Promise.all(components);

    console.log(results);
  }
}
