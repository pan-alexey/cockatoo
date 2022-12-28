import webpack from 'webpack';

export type CompilerStatus = 'created' | 'start' | 'compiling' | ;

export interface MultiCompilerProps {
  [key: string]: webpack.Compiler;
}

export interface MultiCompilerState {
  progressTime: number;
}

export class MultiCompiler<Compilers extends MultiCompilerProps> {
  private compilers: Compilers;

  // public on = (fn: (arg: { [Prop in keyof Names]: number }) => void) => {
  //   this.acc.push(fn);
  // };
}

// export class GenericClass<Names extends Record<string, string>> {
//   private names: Names;

//   private acc: unknown[] = [];

//   constructor(names: Names) {
//     this.names = names;
//   }

//   public on = (fn: (arg: { [Prop in keyof Names]: number }) => void) => {
//     this.acc.push(fn);
//   };
// }
