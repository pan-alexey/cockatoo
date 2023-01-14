import { Builder } from './base';
import type { BuilderState, BuilderStatus, BuilderEvents } from './base';

export type MultiBuilderState = {
  status: BuilderStatus;
};

export class MultiBuilder<Compilers extends Record<string, Builder>> {
  private status: BuilderStatus = 'created';

  private compilers: {
    [Prop in keyof Compilers]: Builder;
  };

  private callbacks: {
    [name in BuilderEvents]: Array<
      (status: BuilderStatus, states: { [Names in keyof Compilers]: BuilderState }) => void
    >;
  } = {
    start: [],
    progress: [],
    done: [],
    closed: [],
  };

  constructor(compilers: Compilers) {
    this.status = 'created';
    this.compilers = compilers;
    this.listenCompilers();
  }

  private listenCompilers() {
    const names = Object.keys(this.compilers) as unknown as Array<keyof Compilers>;
    names.forEach((name: keyof Compilers) => {
      const compiler = this.compilers[name];
      compiler
        .on('start', () => {
          this.processing();
        })
        .on('progress', () => {
          this.processing();
        })
        .on('done', () => {
          this.processing();
        });
    });
  }

  // get state of compilers (call compiler.getState())
  private mapCompilerStates(): { [Names in keyof Compilers]: BuilderState } {
    const names = Object.keys(this.compilers) as unknown as Array<keyof Compilers>;

    return names.reduce<{ [Names in keyof Compilers]: BuilderState }>((acc, name) => {
      acc[name] = this.compilers[name].getState();
      return acc;
    }, {} as { [Names in keyof Compilers]: BuilderState });
  }

  private mapCompilerStatuses(): BuilderStatus[] {
    const states = this.mapCompilerStates();
    const names = Object.keys(states) as unknown as Array<keyof Compilers>;
    return names.map((name) => states[name].status);
  }

  public processing(): void {
    // Ignore created statuses
    const statuses = this.mapCompilerStatuses().filter((status) => status !== 'created');

    const statusesWithoutClosed = statuses.filter((status) => status !== 'closed');
    // All compilers are closed
    if (statusesWithoutClosed.length === 0) {
      this.emit('closed');
      return;
    }

    const statusesWithDone = statusesWithoutClosed.filter((status) => status === 'done');
    // All compilers are done
    if (statusesWithDone.length === statusesWithoutClosed.length) {
      this.emit('done');
      return;
    }

    // If prev status is not progress, set start
    if (this.status !== 'progress') {
      this.emit('start');
      return;
    }

    this.emit('progress');
  }

  private emit(status: BuilderEvents): void {
    this.status = status;
    this.callbacks[status].forEach((fn) => fn(this.status, this.mapCompilerStates()));
  }

  public on(
    event: BuilderEvents,
    fn: (status: BuilderStatus, states: { [Names in keyof Compilers]: BuilderState }) => void,
  ): void {
    this.callbacks[event].push(fn);
  }

  public run(): void {
    const names = Object.keys(this.compilers) as unknown as Array<keyof Compilers>;
    names.forEach((name: keyof Compilers) => {
      this.compilers[name].run();
    });
  }

  public close(callback?: (states: { [Names in keyof Compilers]: BuilderState }) => void): void {
    if (!callback) {
      return;
    }

    const names = Object.keys(this.compilers) as unknown as Array<keyof Compilers>;
    const promises = names.map((name: keyof Compilers) => {
      return this.compilers[name].close();
    });

    Promise.all(promises).then(() => {
      callback(this.mapCompilerStates());
    });
  }
}
