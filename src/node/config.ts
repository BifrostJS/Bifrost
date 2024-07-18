import { GameOptions } from '../core/game';
import { ServerOptions } from '../core/socketServer';
import { BuildOptions } from './build';
import * as path from 'node:path';

export interface BifrostConfig {
    /**
     * The root directory of the project
     * @default process.cwd()
     */
    game?: GameOptions,
    root?: string;
    build?: BuildOptions;
    server?: ServerOptions;
}

export function defineConfig(config: BifrostConfig) {
    return config;
}

export async function getConfig() {
    const config = await import(path.resolve(process.cwd(), 'bifrost.config.ts'));
    return config.default() as BifrostConfig;
}