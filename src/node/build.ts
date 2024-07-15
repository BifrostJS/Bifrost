import { rollup } from "rollup"
import { consola } from "consola";

import type {
    RollupBuild,
    RollupOptions,
  } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

  export interface BuildOptions {
    /**
     * Directory to write the output files to
     */
    out?: string

    /**
     * Rollup configuration options
     */
    rollupOptions?: RollupOptions
  }

  const defaultOptions : BuildOptions = {
    out: 'dist',
    rollupOptions: {
      input: {
        index: 'src/main.ts'
      },
      output: [{
        dir: 'dist',
		    format: 'cjs'
      }],
      plugins: [esbuild(), commonjs(), json(), nodeResolve()]
    },
  }

  export async function build() {
    consola.start("Building project...");

    let bundle: RollupBuild | undefined
    let startTime: number;

    try {
        if(!defaultOptions.rollupOptions) throw new Error('No rollup options provided')

        bundle = await rollup(defaultOptions.rollupOptions)
        await generateOutputs(bundle);
    } catch (error) {
        consola.error(error)
        process.exit(1)
    } finally {
        if (bundle) {
            await bundle.close()
            consola.success("Project built!");
        }
    }

    return true
  }


  async function generateOutputs(bundle) {
    consola.start('Generating outputs...')
    if(!defaultOptions.rollupOptions?.output) throw new Error('No output options provided')
      
    const outputOptionsArray = Array.isArray(defaultOptions.rollupOptions?.output) ? defaultOptions.rollupOptions?.output : [defaultOptions.rollupOptions?.output];
    for (const outputOptions of outputOptionsArray) {
      // generate output specific code in-memory
      // you can call this function multiple times on the same bundle object
      // replace bundle.generate with bundle.write to directly write to disk
      const { output } = await bundle.write(outputOptions);
    }
  }