import webpack from 'webpack';
import { BaseBuilder } from '@cockatoo/common-builder';
import webpackServerConfig from '../webpack/webpack.server';

(async () => {
  const config = webpackServerConfig();
  const compiler = webpack(config);
  const builder = new BaseBuilder(compiler);

  builder.on('start', () => {
    console.log('build start');
  }).on('progress', (state) => {
    console.log(`${state.progress.progress} ${state.progress.message}`);
  }).on('done', (state) => {
    console.log('done', state);
  });

  builder.run();

})();
