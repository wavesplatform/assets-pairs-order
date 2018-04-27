// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default {
  input: 'src/index.js',
  output: {
    file: `dist/browser.js`,
    format: 'iife',
    name: 'OrderPairs',
    exports: 'named',
  },
  plugins: [
    json(),
    resolve({ preferBuiltins: true, browser: true, main: true, jsnext: true }),
    globals(),
    builtins(),
    commonjs(),
    babel()
  ],
};
