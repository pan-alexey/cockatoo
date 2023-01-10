import { loadScript } from "./loadAssets";

export const loadModule = async (
  url,
  module,
) => {
  try {
    await loadScript(url);
    await __webpack_init_sharing__("default");
    const container = window.widget[module];
    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(module);
    return factory();
  } catch (error) {
    console.error("Error loading module:", error);
    throw error;
  }
};
