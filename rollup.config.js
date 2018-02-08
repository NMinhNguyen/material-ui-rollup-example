import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    file: 'index.js',
    format: 'es'
  },
  external: ['react', 'react-dom'],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**', // only transpile our source code,
      plugins: ['external-helpers']
    }),
    commonjs()
  ]
};
