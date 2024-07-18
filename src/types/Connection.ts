import { WebSocket } from "ws";

export interface ISocket extends WebSocket {
    id: string;
}