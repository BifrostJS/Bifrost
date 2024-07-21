import { GameOptions } from '../core/game';
import { ServerOptions } from '../core/socketServer';
import { BuildOptions } from './build';
import { createDefineConfig, loadConfig } from "c12";

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

export const defineConfig = createDefineConfig<BifrostConfig>();

export async function getConfig() {

    const config = await loadConfig({
        configFile: 'bifrost.config',
    });

    return config.config as BifrostConfig;
}