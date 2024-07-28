import { initGameServer } from './core/game/game';
import { getConfig, defineConfig } from './node/config';

export async function createBifrost() {
    const options = await getConfig()
    initGameServer(options)
}

export { defineConfig, getConfig }
export { onTick, clearTick } from './core/game/game';
export { Player } from './core/game/player';
export { Entity } from './core/game/entity';

export { defineSocketEvent } from './core/managers/socketEvents';

export { defineEntity, createEntity } from './core/factories/entityFactory';