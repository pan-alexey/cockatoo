import webpack from 'webpack';
import { BaseCompiler, CompilerCallback } from '../compiler';

export class BaseBuilder extends BaseCompiler {
  constructor(compiler: webpack.Compiler) {
    super(compiler);
  }

  public run = (): void => {
    super.compiler.run((err, stats) => {
      this.compilerHandler(err, stats);
    });
  };

  public close = (callback?: CompilerCallback): void => {
    super.compiler.close(() => {
      this.closeHandle();
      if (callback) {
        callback(this.state);
      }
    });
  };
}
