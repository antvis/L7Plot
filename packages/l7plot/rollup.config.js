import path from 'path';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import analyze from 'rollup-plugin-analyzer';
import alias from '@rollup/plugin-alias';
import { terser } from 'rollup-plugin-terser';
// import { visualizer } from 'rollup-plugin-visualizer';

const projectRootDir = path.resolve(__dirname, '..', '..');

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/umd/l7plot.min.js',
      format: 'umd',
      name: 'L7Plot',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  plugins: [
    nodePolyfills(),
    nodeResolve({ browser: true, preferBuiltins: false }),
    commonjs(),
    alias({
      entries: [
        {
          find: /^@antv\/l7plot-(.*)/,
          replacement: path.resolve(projectRootDir, 'packages/$1/src'),
        },
      ],
    }),
    typescript(),
    analyze({
      summaryOnly: true,
      limit: 10,
    }),
    filesize(),
    // visualizer({
    //   filename: 'dist/umd/stats.html',
    // }),
  ],
};
