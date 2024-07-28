import { rollup } from "rollup"
import { consola } from "consola";

import type {
    RollupBuild,
    RollupOptions,
  } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import AutoImport from 'unplugin-auto-import/rollup'
import autoExecutionsRollup from "./rollup/autoExecutions"
import virtual from '@rollup/plugin-virtual'
import { scanForAutoExecutions } from "./autoExecutions";

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
        index: 'src/main.ts',
        autoExecutions: "autoExecutions"
      },
      output: [{
        dir: 'dist',
		    format: 'cjs'
      }],
      plugins: [
        autoExecutionsRollup(),
        esbuild(),
        commonjs(),
        json(),
        resolve(),
        AutoImport({
          dirs: [],
          dts: true,
          imports: [

          ]
        }),
        virtual({
          autoExecutions: scanForAutoExecutions()
        })
      ]
    },
  }

  export async function build() {
    consola.start("Building project...");

    let bundle: RollupBuild | undefined
    //let startTime: number;

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


  async function generateOutputs(bundle: RollupBuild) {
    consola.start('Generating outputs...')
    if(!defaultOptions.rollupOptions?.output) throw new Error('No output options provided')
      
    const outputOptionsArray = Array.isArray(defaultOptions.rollupOptions?.output) ? defaultOptions.rollupOptions?.output : [defaultOptions.rollupOptions?.output];
    for (const outputOptions of outputOptionsArray) {
      // generate output specific code in-memory
      // you can call this function multiple times on the same bundle object
      // replace bundle.generate with bundle.write to directly write to disk
      await bundle.write(outputOptions);
    }
  }