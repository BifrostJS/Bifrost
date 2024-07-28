import { Entity } from "../game/entity";
import { v7 as uuid } from 'uuid';

const entities = new Map<string, Entity>();

export function addEntity(entity: Entity) {
    const id = uuid();
    entities.set(id, entity);

    return id;
}

export function getEntities() {
    return entities;
}

export function getEntity(id: string) {
    return entities.get(id);
}

export function removeEntity(id: string) {
    getEntity(id)?.destroy();
    entities.delete(id);
}