import configDev from './rollup.dev.config';
import minify from 'rollup-plugin-babel-minify';

export default {
  ...configDev,
  plugins: [...configDev.plugins, minify()],
};
