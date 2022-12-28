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
    super.compiler.watch(options, (err, stats) => {
      super.compilerHandler(err, stats);
    });
  };

  public close = (callback?: CompilerCallback): void => {
    super.compiler.watching.close(() => {
      super.closeHandle();
      if (callback) {
        callback(super.state);
      }
    });
  };
}
