import type { Context } from 'react';

export interface RegistryInterface {
  loadLocal: () => Promise<void>;
}

export interface State {
  id: string;
}

// Custom router
// Собственная реализация контекста
export interface Router {
  push: Promise<void>;
  replace: Promise<void>;
  back: Promise<void>;
}

// Динамический контекст
export interface AppContext {
  [key: string]: Context<unknown>;
}

export interface BaseModule {
  router: Router;
  context: AppContext;
  property: Record<string, unknown>;
  name: string;
}

export interface RemoteWidget {
  name: string; // nameContext - component context
  props: Record<string, unknown>;
  children: RemoteWidget[];
}

export interface AppWidgetContext {
  name: string; // nameContext - component context
  props: Record<string, unknown>;
}

export interface AppWidget {
  name: string; // nameContext - component context
  props: Record<string, unknown>;
  children: AppWidget[];
  context: AppWidgetContext[];
}
