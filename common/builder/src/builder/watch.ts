import webpack from 'webpack';
import { BaseCompiler, CompilerCallback } from '../compiler';

interface WatchOptions {
  aggregateTimeout?: number;
  followSymlinks?: boolean;
  ignored?: string | RegExp | string[];
  poll?: number | boolean;
}

export class WatchBuilder extends BaseCompiler {
  constructor(compiler: webpack.Compiler) {
    super(compiler);
  }

  public run = (watchOption?: WatchOptions): void => {
    const options: WatchOptions = Object.assign(
      {
        aggregateTimeout: 10,
        poll: 10,
      },
      watchOption || {},
    );
    this.compiler.watch(options, (err, stats) => {
      this.compilerHandler(err, stats);
    });
  };

  public close = (callback?: CompilerCallback): void => {
    this.compiler.watching.close(() => {
      this.closeHandle();
      if (callback) {
        callback(this.state);
      }
    });
  };
}
