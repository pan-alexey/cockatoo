export interface RegistryInterface {
  loadLocal: () => Promise<void>;
}

export interface State {
  id: string;
}
