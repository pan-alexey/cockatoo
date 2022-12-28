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
  let startTime = new Date().getTime();

  // Init new Progress Plugin
  new webpack.ProgressPlugin((progress: number, message = '') => {
    // update progress
    progress = Math.round(progress * 100);

    if (progress === 0) {
      startTime = new Date().getTime();

      const buildTime = Math.floor((new Date().getTime() - startTime) / 1000);

      callback({
        status: 'start',
        progress,
        buildTime,
        message,
      });
    }

    // STEP 1: compiling
    if (progress > 0 && progress < 0.1) {
      const buildTime = Math.floor((new Date().getTime() - startTime) / 1000);
      callback({
        status: 'compiling',
        progress,
        buildTime,
        message,
      });
    }

    // STEP 2: BUILDING
    if (progress >= 0.1 && progress <= 0.7) {
      const buildTime = Math.floor((new Date().getTime() - startTime) / 1000);
      callback({
        status: 'building',
        progress,
        buildTime,
        message,
      });
    }

    // STEP 3: PROCESSING
    if (progress >= 0.7 && progress < 0.95) {
      const buildTime = Math.floor((new Date().getTime() - startTime) / 1000);
      callback({
        status: 'processing',
        progress,
        buildTime,
        message,
      });
    }

    // STEP 4: EMIT
    if (progress >= 0.95 && progress < 0.95) {
      const buildTime = Math.floor((new Date().getTime() - startTime) / 1000);
      callback({
        status: 'emit',
        progress: Math.round(progress * 100),
        buildTime,
        message,
      });
    }

    // STEP 4: AFTER EMIT
    if (progress >= 0.98 && progress < 1) {
      const buildTime = Math.floor((new Date().getTime() - startTime) / 1000);
      callback({
        status: 'afterEmit',
        progress,
        buildTime,
        message,
      });
    }

    // STEP DONE
    if (progress === 1) {
      const buildTime = Math.floor((new Date().getTime() - startTime) / 1000);
      callback({
        status: 'done',
        progress,
        buildTime,
        message,
      });
    }
  }).apply(compiler);
};
