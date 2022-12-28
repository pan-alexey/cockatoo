import webpack from 'webpack';
import { compilerProgress } from '../plugin';
import type { ProgressState } from '../plugin';

export type CompilerStatus = 'created' | 'start' | 'progress' | 'done' | 'closed';
export type CompilerEvents = 'start' | 'progress' | 'done' | 'closed';

export type CompilerState = {
  stats: null | webpack.Stats;
  status: CompilerStatus;
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

export abstract class BaseCompiler {
  protected compiler: webpack.Compiler;

  protected state: CompilerState = {
    status: 'created',
    stats: null,
    err: null,
    progress: getDefaultProgress(),
  };

  private callbacks: {
    [name in CompilerEvents]: Array<CompilerCallback>;
  } = {
    start: [],
    progress: [],
    done: [],
    closed: [],
  };

  constructor(compiler: webpack.Compiler) {
    this.compiler = compiler;
    this.listenCompiler();
  }

  public getState = (): CompilerState => {
    return this.state;
  };

  public on = (name: CompilerEvents, callback: CompilerCallback): BaseCompiler => {
    this.callbacks[name].push(callback);
    return this;
  };

  abstract run(): void;

  abstract close(callback?: CompilerCallback): void;

  private listenCompiler = () => {
    compilerProgress(this.compiler, (progressState) => {
      // Save progress state
      this.state.progress = progressState;

      switch (progressState.status) {
        case 'start':
          this.emitStart();
          break;
        case 'compiling':
        case 'building':
        case 'processing':
        case 'emit':
        case 'afterEmit':
          this.emitProgress();
          break;
        case 'done':
          this.emitDone();
          break;
      }
    });
  };

  protected compilerHandler = (err: Error | null = null, stats: webpack.Stats | null = null): void => {
    this.state.stats = stats;
    this.state.err = err;
    this.emitDone();
  };

  protected closeHandle = () => {
    this.emitClose();
  };

  private emitStart = (): void => {
    // Reset stats
    this.state.status = 'start';
    this.state.stats = null;
    this.state.err = null;

    // emit start callbacks
    this.callbacks.start.forEach((fn) => fn(this.state));
  };

  private emitProgress = (): void => {
    this.state.status = 'progress';

    // emit progress callbacks
    this.callbacks.progress.forEach((fn) => fn(this.state));
  };

  private emitDone = (): void => {
    if ((this.state.stats || this.state.err) && this.state.progress.status === 'done') {
      this.state.status = 'done';

      // emit done callbacks
      this.callbacks.done.forEach((fn) => fn(this.state));
    }
  };

  private emitClose = (): void => {
    this.state.stats = null;
    this.state.status = 'closed';
    this.state.err = null;
    this.state.progress = {
      progress: 0,
      status: 'closed',
      buildTime: 0,
      message: '',
    };

    // emit closed callbacks
    this.callbacks.closed.forEach((fn) => fn(this.state));
  };
}
