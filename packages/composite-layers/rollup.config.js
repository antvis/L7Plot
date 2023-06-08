import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import analyze from 'rollup-plugin-analyzer';
import { terser } from 'rollup-plugin-terser';

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
  ],
};
