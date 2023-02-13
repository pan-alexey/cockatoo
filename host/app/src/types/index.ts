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
