import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';

export default [
	{
		input: 'src/lib/helpers.ts',
		output: [
			{
				file: 'dist/helpers.cjs',
				format: 'cjs'
			},
			{
				file: 'dist/helpers.js',
				format: 'esm'
			}
		],
		plugins: [
			json(),
			typescript(), // Compile TypeScript
			commonjs(), // Convert CommonJS modules to ES6
			resolve() // Resolve module paths
		]
	}
];
