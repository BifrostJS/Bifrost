import { ISocket } from "../../types/Connection";
import { Entity } from "./entity";

export class Player {
    public authenticated: boolean = false;
    public possessing: Entity | undefined = undefined;

    constructor(public socket: ISocket) {
        console.log("Player created with name " + socket.id);
    }

    public onConnect() {
        console.log("Player connected");
    }

    public async onDisconnect() {
        console.log("Player disconnected");
    }

    public isPossessing() {
        return this.possessing !== undefined;
    }

    public possess(entity: Entity) {
        this.possessing = entity;
    }


}