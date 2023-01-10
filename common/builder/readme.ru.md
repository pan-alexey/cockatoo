# common-builder

Пакет является фассадом, для webpack.
Основная задача, данного пакета - добавить возможность получения прогресса сброки
Пакет позволяет аггрегировать прогресс нескольких сборок.


## BaseBuilder

Пример использования **BaseBuilder**

```ts
import webpack from 'webpack';
import { BaseBuilder, CompilerState } from '@cockatoo/common-builder';

const compiler = webpack({
      entry: [
        path.resolve(publicPath, "./index.js"),
      ],
      mode: "development",
      output: {
        filename: "index.js",
        path: path.resolve(publicPath, "./build"),
      },
});

const baseBuilder = new BaseBuilder(compiler);

// listen build events
baseBuilder.on('start', (state: CompilerState) => {
  // ...
})
.on('progress', (state: CompilerState) => {
  // ...
})
.on('done', (state: CompilerState) => {
  // ...
});

// build run
build.run();
```
 