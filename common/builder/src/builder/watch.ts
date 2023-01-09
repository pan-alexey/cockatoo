import webpack from 'webpack';
import { BaseCompiler, CompilerCallback } from '../compiler';

interface WatchOptions {
  aggregateTimeout?: number;
  followSymlinks?: boolean;
  ignored?: string | RegExp | string[];
  poll?: number | boolean;
}

const DEFAULT_WATCH_OPTIONS: WatchOptions = {
  aggregateTimeout: 10,
  poll: 10,
};

export class WatchBuilder extends BaseCompiler {
  constructor(compiler: webpack.Compiler) {
    super(compiler);
  }

  public run(watchOption: WatchOptions = {}): void {
    const options: WatchOptions = Object.assign({}, DEFAULT_WATCH_OPTIONS, watchOption);
    super.compiler.watch(options, (err, stats) => {
      super.compilerHandler(err, stats);
    });
  }

  public close(callback?: CompilerCallback): void {
    super.compiler.watching.close(() => {
      super.closeHandle();
      if (callback) {
        callback(this.state);
      }
    });
  }
}
