import { ISocket } from "../../types/Connection";

interface socketEventHooks {
    [event: string]: Function[]
}

const functionsOnTick : socketEventHooks = {}


export function defineSocketEvent(event: string, fn: Function) {
    if(!functionsOnTick[event]) {
        functionsOnTick[event] = [];
    }

    functionsOnTick[event].push(fn);
}

export function executeSocketEvent(event: string, data: any, socket: ISocket) {
    if(functionsOnTick[event]) {
        functionsOnTick[event].forEach(fn => {
            fn(data, socket);
        });
    }
}