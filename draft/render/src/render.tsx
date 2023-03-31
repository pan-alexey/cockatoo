// const layout = {
//   widgets: [
//     {
//       widgetName: '',
//     }
//   ]
// }

export interface RenderProps {
  remote: string;
}

export class Render {
  private remote: string;
  constructor(props: RenderProps) {
    this.remote = props.remote;
  }

  public renderCss() {}
  public renderJs() {}

  public renderBodyStream(pipe) {}

  public renderBodyString() {}
}

const render = new Render({
  remote: "http://194.61.0.202:9000/vexa",
});

render.assets = () => {
  return {
    main: {
      css: ["main@1.0.1.css"],
      js: ["main@1.0.1.js"],
    },
    widgets: {
      css: ["widget@1.0.1.css"],
      js: ["widget@1.0.1.js"],
    },
    assetsMap: {},
  };
};
