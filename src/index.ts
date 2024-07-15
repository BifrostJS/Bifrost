import { ServerOptions, initServer } from "./core/socketServer";
import { BuildOptions } from "./node/build";

export interface BifrostOptions {
    build?: BuildOptions,
    serverOptions?: ServerOptions
}


export function createBifrost(options: BifrostOptions) {
    initServer(options.serverOptions??undefined)
}

export { defineConfig, getConfig } from './node/config';