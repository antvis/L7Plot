import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import analyze from 'rollup-plugin-analyzer';
// import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    // {
    //   file: 'dist/umd/l7plot.min.js',
    //   format: 'umd',
    //   name: 'l7plot',
    //   sourcemap: false,
    //   plugins: [terser()],
    // },
    {
      file: 'dist/umd/l7plot.js',
      format: 'umd',
      name: 'l7plot',
      sourcemap: true,
    },
  ],
  plugins: [
    nodePolyfills(),
    nodeResolve({ browser: true, preferBuiltins: false }),
    commonjs({
      // dynamicRequireTargets: ['node_modules/inversify/lib/syntax/binding_{on,when}_syntax.js'],
    }),
    typescript(),
    analyze({
      summaryOnly: true,
      limit: 50,
    }),
    filesize(),
  ],
};
