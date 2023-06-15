import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import analyze from 'rollup-plugin-analyzer';
import filesize from 'rollup-plugin-filesize';
import { terser } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';

export default {
  input: 'src/index.ts',
  external: ['@antv/l7'],
  output: [
    {
      file: 'dist/umd/l7-composite-layers.min.js',
      format: 'umd',
      name: 'L7.CompositeLayers',
      globals: {
        '@antv/l7': 'L7',
      },
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  plugins: [
    nodeResolve({ browser: true, preferBuiltins: false }),
    commonjs(),
    typescript(),
    analyze({
      summaryOnly: true,
      limit: 10,
    }),
    filesize(),
    visualizer({
      filename: 'dist/umd/stats.html',
    }),
  ],
};
