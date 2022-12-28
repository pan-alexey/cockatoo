import webpack from 'webpack';
import { BaseCompiler, CompilerCallback } from '../compiler';

export class BaseBuilder extends BaseCompiler {
  constructor(compiler: webpack.Compiler) {
    super(compiler);
  }

  public run = (): void => {
    super.compiler.run((err, stats) => {
      super.compilerHandler(err, stats);
    });
  };

  public close = (callback?: CompilerCallback): void => {
    super.compiler.close(() => {
      super.closeHandle();
      if (callback) {
        callback(this.state);
      }
    });
  };
}
