import { readFile } from "node:fs/promises";
import { createServer, Server as ServerType } from "node:https";
import { Server } from "socket.io";

export interface ServerOptions {
    ssl?: {
        key: string,
        cert: string
    },
    port: number

}

let socket: Server;
let httpsServer: ServerType | undefined = undefined;


const hasSSL = false;


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

  socket = new Server(httpsServer);


}