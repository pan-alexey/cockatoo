import { BaseBuilder, CompilerState, CompilerEvents } from '..';
import webpack from 'webpack';

describe('BaseBuilder', () => {
  test('Error build', async () => {
    const compiler = webpack({});
    const build = new BaseBuilder(compiler);

    expect(build.getState()).toEqual({
      status: 'created',
      stats: null,
      err: null,
      progress: { progress: 0, status: 'created', buildTime: 0, message: '' },
    });

    // -------------------------------------------------------------//
    // Collect events

    const collectEvents: Array<{
      event: CompilerEvents;
      state: CompilerState;
    }> = [];

    build
      .on('start', (state) => {
        collectEvents.push({
          event: 'start',
          state,
        });
      })
      .on('progress', (state) => {
        collectEvents.push({
          event: 'progress',
          state,
        });
      })
      .on('done', (state) => {
        collectEvents.push({
          event: 'done',
          state,
        });
      });

    // -------------------------------------------------------------//
    const doneState: CompilerState = await new Promise((resolve) => {
      build
        .on('done', (state) => {
          resolve(state);
        })
        .run();
    });

    // Check getState()
    expect(build.getState()).toEqual(doneState);

    // Compile has error;
    expect(doneState.stats?.compilation.errors.length).not.toBe(0);

    // Compile time is not zero
    expect(doneState.progress.buildTime).not.toBe(0);

    // Progress percent eq 100
    expect(doneState.progress.progress).toBe(100);

    // Compile status is done;
    expect(doneState.progress.status).toBe('done');
  });
});
