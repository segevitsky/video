import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';
dotenv.config();
// import {eslint} from 'rollup-plugin-eslint';


export default {
  input: 'src/player.js',
  output: {
    file: 'bundle.js',
    name: 'video_project',
    format: 'iife',
    // sourceMap: `inline`,
  },
  plugins: [
    nodeResolve({ jsnext: true, main: true, browser: true }),
    commonjs(),
    babel({ babelHelpers: 'bundled',exclude: 'node_modules/**' }),
    // replace({
    //   exclude: 'node_modules/**',
    //   // ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // }),
    // eslint({ exclude: ['src/styles/**'] }),
  ],
};

