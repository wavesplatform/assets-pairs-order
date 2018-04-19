import configDev from './rollup.umd';

import minify from 'rollup-plugin-babel-minify';
import cleanup from 'rollup-plugin-cleanup';

export default {
  ...configDev,
  plugins: [...configDev.plugins, minify(), cleanup()],
};
