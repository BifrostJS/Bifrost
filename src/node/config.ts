import { BuildOptions } from './build';
import * as path from 'node:path';

export function defineConfig(config: BifrostConfig) {
    return config;
}

export interface BifrostConfig {
    /**
     * The root directory of the project
     * @default process.cwd()
     */
    root?: string;
    build: BuildOptions;
}

export async function getConfig() {
    const config = await import(path.resolve(process.cwd(), 'bifrost.config.ts'));
    return config.default() as BifrostConfig;
}