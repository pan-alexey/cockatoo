import React from "react";
import { loadScript } from './mf-helper/loadAssets';

const widgetName = 'remote2~1.0.1'

const remoteWidget = async () => {
  await __webpack_init_sharing__("default");

  if (IS_SERVER) {
    const container = __non_webpack_require__('/Users/agpan/Github-new/server-side-rendering/remote2/dist/server/module.js');
    const module = await container.get("widget");
    return module();
  } else {
    await loadScript('http://localhost:8002/client/module.js');
    const container = window.widget[widgetName];
    await container.init(__webpack_share_scopes__.default);
    const module = await container.get('widget');
    return module();
  }
}

const Image = React.lazy(() => remoteWidget());

export default () => (
    <div style={{
      backgroundColor: 'green',
      color: 'lightgrey',
      padding: '1rem'
    }}>
      <h2>Remote 1: Content</h2>
      <p>This is the content from remote 1, which will include an image component exposed by remote2. This demonstrates nested federated modules being rendered server-side.</p>
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <Image />
      </React.Suspense>
    </div>
  );