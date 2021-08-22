/* eslint-disable @typescript-eslint/no-var-requires */
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy'

export default [
	{
		input: 'src/index.js',
		output: {
			file: 'files/index.js',
			format: 'esm',
			sourcemap: true
		},
		plugins: [
			nodeResolve(), commonjs(), json(),
			copy({
				targets: [
				  { src: 'src/deps.ts', dest: 'files' },
				  { src: 'src/oak.ts', dest: 'files' },
				]
			})
		],
		external: ['../output/server/app.js', './env.js', './deps.ts', './oak.ts', ...require('module').builtinModules]
	}
];
