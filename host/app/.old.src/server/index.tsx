import React from 'react';
import pretty from 'pretty';

import type { RemoteWidget } from '../types/widget';

export class Render {
  public async render() {
    console.log('render');
  }
}

// import { BaseModule, ModuleItem } from './base';

// const data: ModuleItem[] = [
//   {
//     name: 'component2',
//     props: { data: '🤪' },
//     children: [
//       {
//         name: 'component2',
//         props: { data: '😀' },
//       },
//     ],
//   },
//   {
//     name: 'component1',
//     props: { data: '🤪' },
//   },
//   {
//     name: 'component1',
//     props: { data: '🤪' },
//   },
// ];

// export class Render {
//   private baseModule = new BaseModule();

//   public async render() {
//     console.log('render');
//     // const components = [
//     //   this.baseModule.render('component2', { data: '😀' }),
//     //   this.baseModule.render('component1', {}),
//     //   this.baseModule.render('component2', { data: '🤪' }),
//     // ];

//     const html = await this.baseModule.render(data);

//     // const results = await Promise.all(components);

//     console.log(pretty(html));
//   }
// }
