import { GameOptions, initGameServer } from "./core/game";
import { ServerOptions } from "./core/socketServer";
import { BuildOptions } from "./node/build";

export interface BifrostOptions {
    game?: GameOptions, 
    build?: BuildOptions,
    serverOptions?: ServerOptions
}


export function createBifrost(options: BifrostOptions) {
    initGameServer(options)
}

export { defineConfig, getConfig } from './node/config';
export { onTick, clearTick } from './core/game';