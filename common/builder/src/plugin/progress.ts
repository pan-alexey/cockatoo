import webpack from 'webpack';

/*
https://medium.com/@artempetrovcode/how-webpack-progressplugin-works-7e7301a3d919
*/

export type ProgressStatus =
  | 'created'
  | 'start'
  | 'compiling'
  | 'building'
  | 'processing'
  | 'emit'
  | 'afterEmit'
  | 'done'
  | 'closed';

export interface ProgressState {
  status: ProgressStatus;
  progress: number;
  buildTime: number;
  message: string;
}

type ProgressCallback = (progress: ProgressState) => void;

export const compilerProgress = (compiler: webpack.Compiler, callback: ProgressCallback) => {
  let startTime = Date.now();
  // let status: ProgressStatus = 'created';
  // let buildTime = 0;

  // Init new Progress Plugin
  new webpack.ProgressPlugin((progress: number, message = '') => {
    // update progress
    progress = Math.round(progress * 100);
    let status: ProgressStatus = 'created';
    let buildTime = 0;

    if (progress === 0) {
      startTime = Date.now();
      buildTime = Date.now() - startTime;
      status = 'start';
    }

    // STEP 1: compiling
    if (progress > 0 && progress < 10) {
      buildTime = Date.now() - startTime;
      status = 'compiling';
    }
    // STEP 2: BUILDING
    else if (progress >= 10 && progress <= 70) {
      buildTime = Date.now() - startTime;
      status = 'building';
    }
    // STEP 3: PROCESSING
    else if (progress >= 70 && progress < 95) {
      buildTime = Date.now() - startTime;
      status = 'processing';
    }
    // STEP 4: EMIT
    else if (progress >= 95 && progress < 98) {
      buildTime = Date.now() - startTime;
      status = 'emit';
    }
    // STEP 4: AFTER EMIT
    else if (progress >= 98 && progress < 100) {
      buildTime = Date.now() - startTime;
      status = 'afterEmit';
    }
    // STEP DONE
    else if (progress === 100) {
      buildTime = Date.now() - startTime;
      status = 'done';
    }

    callback({
      status,
      progress,
      buildTime,
      message,
    });
  }).apply(compiler);
};
