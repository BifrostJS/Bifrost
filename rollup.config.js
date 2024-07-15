import AutoImport from 'unplugin-auto-import/rollup'
import copy from 'rollup-plugin-copy'
import esbuild from 'rollup-plugin-esbuild'

export default {
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
		esbuild(),
	]
};