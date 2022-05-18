import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import analyze from 'rollup-plugin-analyzer';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/umd/l7-composite-layers.min.js',
      format: 'umd',
      name: 'L7CompositeLayers',
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
