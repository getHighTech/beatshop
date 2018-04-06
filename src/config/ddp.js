import DDP from "ddp.js";
const options = {
    endpoint: "ws:/localhost:5000/websocket",
    SocketConstructor: WebSocket
};

export const MClient = new DDP(options);

