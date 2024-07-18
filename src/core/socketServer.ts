import { readFile } from "node:fs/promises";
import { createServer, Server } from "node:https";
import { WebSocketServer } from 'ws';

export interface ServerOptions {
    ssl?: {
        key: string,
        cert: string
    },
    port: number

}

let wss: WebSocketServer;
let httpsServer: Server | undefined = undefined;


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

  wss = new WebSocketServer(httpsServer ? { server: httpsServer } : { port: options?.port ?? 3000 });

  console .log("Server started on port " + (options?.port ?? 3000));


  wss.on('connection', function connection(ws) {
    console.log("New connection");

    ws.on('error', console.error);
  
    ws.on('message', function message(data) {
      console.log('received: %s', data);
    });
  });
}