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
