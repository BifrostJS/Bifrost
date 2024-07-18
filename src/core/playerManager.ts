import { Player } from "./player";
import { ISocket } from "../types/Connection";

const players = new Map() as Map<string, Player>;

export function addPlayer(socket: ISocket): Player {
    const player = new Player(socket);
    players.set(socket.id, player);
    player.onConnect();
    return player;
}

export function getPlayers(): Map<string, Player> {
    return players;
}

export async function removePlayer(id: string) {
    await players.get(id)?.onDisconnect();
    players.get(id)?.socket.close();
    players.delete(id);
}