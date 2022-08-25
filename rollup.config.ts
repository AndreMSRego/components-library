import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';

import PACKAGE_JSON from './package.json';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: PACKAGE_JSON.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: PACKAGE_JSON.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      typescript({ tsconfig: './tsconfig.json', exclude: 'node_modules' }),
      terser(),
    ],
  },
  {
    input: 'dist/index.d.ts',
    output: [
      {
        file: PACKAGE_JSON.types,
        format: 'esm',
      },
    ],
    plugins: [
      dts(),
    ],
  },
];