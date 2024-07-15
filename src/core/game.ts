import { BifrostOptions } from "..";
import { initServer } from "./socketServer";
import { v7 as uuidv7 } from 'uuid';

export interface GameOptions {
    hz?: number // Ticks per second (default 12)
}

const functionsOnTick = new Map() as Map<string, Function>;

export function initGameServer(options: BifrostOptions) {
    console.log("Game server initialized!");
    setInterval(tick, 1000 / (options?.game?.hz??12));

    initServer(options?.serverOptions??undefined)
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