import AutoImport from 'unplugin-auto-import/rollup'
import copy from 'rollup-plugin-copy'
import esbuild from 'rollup-plugin-esbuild'
import { dts } from "rollup-plugin-dts";




export default [
	{
		input: {
			index: 'src/index.ts',
			cli: 'src/node/cli.ts',
		},
		output: {
			dir: 'dist',
			format: 'esm'
		},
		plugins: [
			AutoImport({
				dts: true,
				dirs: [
					'./src/entities/**',
				],
			}),
			copy({
				targets: [
					{ src: 'package.json', dest: 'dist' },
					{ src: 'package-lock.json', dest: 'dist' },
				],
			}),
			esbuild({
				tsconfig: 'tsconfig.json',
			}),
		]
	},
	{
		input: "./src/index.ts",
		output: [{ file: "dist/index.d.ts", format: "es" }],
		plugins: [dts()],
	}
];