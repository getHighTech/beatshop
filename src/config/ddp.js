import DDP from "ddp.js";
const options = {
    endpoint: "ws:/localhost:5000/websocket",
    // endpoint: "ws:/localhost:5000/websocket",//for dev
    SocketConstructor: WebSocket
};

export const MClient = new DDP(options);

