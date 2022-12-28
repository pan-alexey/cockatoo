import webpack from 'webpack';
import { compilerProgress } from '../plugin';
import type { ProgressState } from '../plugin';

export type BuildStatus = 'created' | 'start' | 'progress' | 'done';
export type CompilerEvents = 'start' | 'progress' | 'done';

export type CompilerState = {
  stats: null | webpack.Stats;
  status: BuildStatus;
  err: null | Error;
  progress: ProgressState;
};

export type CompilerCallback = (state: CompilerState) => void;

const getDefaultProgress = (): ProgressState => {
  return {
    progress: 0,
    status: 'created',
    buildTime: 0,
    message: '',
  };
};

export class BaseCompiler {
  protected compiler: webpack.Compiler;

  private callbacks: {
    [name in CompilerEvents]: Array<CompilerCallback>;
  } = {
    start: [],
    progress: [],
    done: [],
  };

  private state: CompilerState = {
    status: 'created',
    stats: null,
    err: null,
    progress: getDefaultProgress(),
  };

  constructor(compiler: webpack.Compiler) {
    this.compiler = compiler;

    compilerProgress(compiler, (progressState) => {
      // save progress state
      this.state.progress = progressState;

      switch (progressState.status) {
        case 'start':
          this.onStart();
          break;
        case 'compiling':
        case 'building':
        case 'processing':
        case 'emit':
        case 'afterEmit':
          this.onProgress();
          break;
        case 'done':
          this.onDone();
          break;
      }
    });
  }

  public getState = (): CompilerState => {
    return this.state;
  };

  protected compilerHandler = (err: Error | null = null, stats: webpack.Stats | null = null): void => {
    this.state.stats = stats;
    this.state.err = err;
  };

  private onStart = (): void => {
    // Reset
    this.state.status = 'start';
    this.state.stats = null;
    this.state.err = null;

    // apply start callbacks
  };

  private onProgress = () => {
    this.state.status = 'progress';

    // apply progress callbacks
  };

  private onDone = (): void => {
    if ((this.state.stats || this.state.err) && this.state.progress.status === 'done') {
      this.state.status = 'done';

      // apply done callbacks
    }
  };

  public on = (name: CompilerEvents, callback: CompilerCallback) => {
    this.callbacks[name].push(callback);
    return this;
  };
}
