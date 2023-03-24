import pretty from 'pretty';
import { data } from './data';
import { renderApp } from './base';

export class Render {
  public async render() {
    // const html = await renderComponent(<App />);
    const appData = await renderApp(data);
    // console.log(pretty(html));

    console.log(pretty(appData));
  }
}
