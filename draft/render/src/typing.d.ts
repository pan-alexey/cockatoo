/* eslint-disable no-var */
export {};
declare global {
  interface Window {
    __text__: string;
  }
}

declare global {
  interface Window {
    widget: Record<string, unknown>;
  }
}

declare module "*.css" {
  const mapping: Record<string, string>;
  export default mapping;
}
