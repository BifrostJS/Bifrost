import { Entity } from "../game/entity";

const entityTypes : { [key: string]: typeof Entity } = {};

export function defineEntity(name: string, entity: typeof Entity) {
    entityTypes[name] = entity;
}

export function createEntity(name: string, ...args: any[]) {
    if (!entityTypes[name]) {
        throw new Error(`Entity ${name} not found`);
    }
    return new entityTypes[name]();
}