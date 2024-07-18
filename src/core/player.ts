import { ISocket } from "../types/Connection";

export class Player {
    constructor(public socket: ISocket) {
        console.log("Player created with name " + socket.id);
    }

    public onConnect() {
        console.log("Player connected");
    }

    public async onDisconnect() {
        console.log("Player disconnected");
    }


}