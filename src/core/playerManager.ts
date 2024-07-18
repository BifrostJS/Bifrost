import { Player } from "./player";
import { ISocket } from "../types/Connection";

const players = new Map() as Map<string, Player>;

export function addPlayer(socket: ISocket): Player {
    const player = new Player(socket);
    players.set(socket.id, player);
    return player;
}

export function getPlayers(): Map<string, Player> {
    return players;
}

export function removePlayer(id: string) {
    players.get(id)?.socket.close();
    players.delete(id);
}