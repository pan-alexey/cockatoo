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

  // Init new Progress Plugin
  new webpack.ProgressPlugin((progress: number, message = '') => {
    // update progress
    progress = Math.round(progress * 100);
    let status: ProgressStatus | null = 'created';
    let buildTime = 0;

    if (progress === 0) {
      startTime = Date.now();
      buildTime = Math.floor((Date.now() - startTime) / 1000);
      status = 'start';
    }

    // STEP 1: compiling
    if (progress > 0 && progress < 0.1) {
      buildTime = Math.floor((Date.now() - startTime) / 1000);
      status = 'compiling';
    }
    // STEP 2: BUILDING
    else if (progress >= 0.1 && progress <= 0.7) {
      buildTime = Math.floor((Date.now() - startTime) / 1000);
      status = 'building';
    }
    // STEP 3: PROCESSING
    else if (progress >= 0.7 && progress < 0.95) {
      buildTime = Math.floor((Date.now() - startTime) / 1000);
      status = 'processing';
    }
    // STEP 4: EMIT
    else if (progress >= 0.95 && progress < 0.95) {
      buildTime = Math.floor((Date.now() - startTime) / 1000);
      status = 'emit';
    }
    // STEP 4: AFTER EMIT
    else if (progress >= 0.98 && progress < 1) {
      buildTime = Math.floor((Date.now() - startTime) / 1000);
      status = 'afterEmit';
    }
    // STEP DONE
    else if (progress === 1) {
      buildTime = Math.floor((Date.now() - startTime) / 1000);
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
