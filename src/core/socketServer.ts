import { createServer, Server } from "node:https";
import { WebSocketServer } from 'ws';
import { v7 as uuidv7 } from 'uuid';
import { addPlayer, removePlayer } from "./playerManager";
import { ISocket } from "../types/Connection";

export interface ServerOptions {
    ssl?: {
        key: string,
        cert: string
    },
    port: number

}

let wss: WebSocketServer;
let httpsServer: Server | undefined = undefined;

//const hasSSL = false;

export function initServer(options: ServerOptions | undefined = undefined) {
  if(options && options.ssl) {
      httpsServer = createServer({
          key: options.ssl.key,
          cert: options.ssl.cert
        }, async (req, res) => {
          if (req.method === "GET" && req.url === "/") {
            res.writeHead(200, {
              "content-type": "text/html"
            });
            res.write("Bifrost server is running!");
            res.end();
          } else {
            res.writeHead(404).end();
          }
        });
        
  }

  wss = new WebSocketServer(httpsServer ? { server: httpsServer } : { port: options?.port ?? 3000 });

  console .log("Server started on port " + (options?.port ?? 3000));


  wss.on('connection', function connection(ws:ISocket) {
    console.log("New connection");
    ws.id = uuidv7();

    addPlayer(ws);

    ws.on('error', console.error);
  
    ws.on('message', function message(data) {
      console.log('received: %s', data);
    });

    ws.on('close', function close() {
      console.log('disconnected');
      removePlayer(ws.id);
    });
  });
}