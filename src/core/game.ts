import { BifrostConfig } from "../node/config";
import { Player } from "./player";
import { initServer } from "./socketServer";
import { v7 as uuidv7 } from 'uuid';

export interface GameOptions {
    hz?: number // Ticks per second (default 12)
    playerClass: typeof Player
}

const functionsOnTick = new Map() as Map<string, Function>;

export function initGameServer(options: BifrostConfig) {
    console.log("Game server initialized!");
    setInterval(tick, 1000 / (options?.game?.hz??12));

    initServer(options?.server??undefined)
}

export function onTick(fn: Function) {
    const id = uuidv7();
    functionsOnTick.set(id, fn);
}

export function clearTick(id: string) {
    functionsOnTick.delete(id);
}

export function tick() {
    functionsOnTick.forEach(fn => {
        fn();
    });
}