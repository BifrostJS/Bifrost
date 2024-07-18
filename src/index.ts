import { initGameServer } from './core/game';
import { getConfig, defineConfig } from './node/config';

export async function createBifrost() {
    const options = await getConfig()
    initGameServer(options)
}

export { defineConfig, getConfig }
export { onTick, clearTick } from './core/game';
export { Player } from './core/player';