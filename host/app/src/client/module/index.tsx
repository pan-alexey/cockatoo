import React from "react";
import { loadModule } from './utils/loadModule';

export const RenderWidget: React.FC = () => {
  return <div></div>;
};

export const getWidget1 = async () => {
  const Element = await loadModule('http://127.0.0.1:8080/client/module.js', 'widget1');
  return Element;
};
