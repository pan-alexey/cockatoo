export interface RegistryModule {
  name: string;
}

export class Registry {
  private moduleMap: Map<string, unknown> = new Map();

  public async loadModule(name: string, registryModule: unknown) {
    this.moduleMap.set(name, registryModule);
  }

  public async getModule(name: string) {
    await new Promise((resolve) => setTimeout(resolve, 1_000));

    return this.moduleMap.get(name);
  }
}
