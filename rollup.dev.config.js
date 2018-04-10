// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'orderAssetsPairs',
  },
  plugins: [
    resolve(),
    builtins(),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: 'node_modules/**',
    }),
    json({
      exclude: ['node_modules/**'],
    }),
    babel({
      exclude: 'node_modules/**', // only transpile our source code
      plugins: ['external-helpers'],
    }),
  ],
};
