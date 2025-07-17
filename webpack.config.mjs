import { merge } from 'webpack-merge';
import commonConfig from './webpack/webpack.common.mjs';
import devConfig from './webpack/webpack.development.mjs';
import prodConfig from './webpack/webpack.production.mjs';

export default (env, argv) => {
  const mode = argv.mode || 'development';
  return merge(commonConfig, mode === 'development' ? devConfig : prodConfig);
};
