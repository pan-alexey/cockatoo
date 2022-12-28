import webpack from 'webpack';
import { BaseCompiler, CompilerState } from '../compiler';
import { WatchBuilder } from './watch';
import { BaseBuilder } from './build';

export type MultiBuilderState = {
  status: BuilderStatus;
};

export type BuilderStatus = 'created' | 'start' | 'progress' | 'done' | 'closed';
export type BuilderEvents = 'start' | 'progress' | 'done' | 'closed';

export class MultiBuilder<Compilers extends Record<string, BaseCompiler>> {
  private status: BuilderStatus = 'created';

  private compilers: {
    [Prop in keyof Compilers]: BaseCompiler;
  };

  private callbacks: {
    [name in BuilderEvents]: Array<
      (status: BuilderStatus, states: { [Names in keyof Compilers]: CompilerState }) => void
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

  private listenCompilers = () => {
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
  };

  // get state of compilers (call compiler.getState())
  private compilerStates = (): { [Names in keyof Compilers]: CompilerState } => {
    const compilers = this.compilers;
    const names = Object.keys(compilers) as unknown as Array<keyof Compilers>;

    return names.reduce<{ [Names in keyof Compilers]: CompilerState }>((acc, name) => {
      acc[name] = compilers[name].getState();
      return acc;
    }, {} as { [Names in keyof Compilers]: CompilerState });
  };

  private compilerStatuses = (): BuilderStatus[] => {
    const states = this.compilerStates();
    const names = Object.keys(states) as unknown as Array<keyof Compilers>;
    return names.map((name) => states[name].status);
  };

  public processing = (): void => {
    // Ignore created statuses
    const statuses = this.compilerStatuses().filter((status) => status !== 'created');

    const statusesWithoutClosed = statuses.filter((status) => status === 'closed');
    // All compilers are closed
    if (statusesWithoutClosed.length === statuses.length) {
      this.emit('closed');
      return;
    }

    const statusesWithoutDone = statuses.filter((status) => status === 'done');
    // All compilers are done
    if (statusesWithoutDone.length === statuses.length) {
      this.emit('done');
      return;
    }

    // If prev status is not progress, set start
    if (this.status !== 'progress') {
      this.emit('start');
      return;
    }

    this.emit('progress');
  };

  private emit = (status: BuilderStatus): void => {
    this.status = status;
    this.callbacks[status].forEach((fn) => fn(this.status, this.compilerStates()));
  };

  public on = (
    event: BuilderEvents,
    fn: (status: BuilderStatus, states: { [Names in keyof Compilers]: CompilerState }) => void,
  ): void => {
    this.callbacks[event].push(fn);
  };

  public run = (): void => {
    const names = Object.keys(this.compilers) as unknown as Array<keyof Compilers>;
    names.forEach((name: keyof Compilers) => {
      this.compilers[name].run();
    });
  };

  public close = (callback?: (states: { [Names in keyof Compilers]: CompilerState }) => void): void => {
    if (!callback) {
      return;
    }

    const names = Object.keys(this.compilers) as unknown as Array<keyof Compilers>;
    const promises = names.map((name: keyof Compilers) => {
      return new Promise((resolve) => this.compilers[name].close(resolve));
    });

    Promise.all(promises).then(() => {
      callback(this.compilerStates());
    });
  };
}
