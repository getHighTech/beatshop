import DDP from "ddp.js";
const options = {
    endpoint: "ws:/192.168.1.107:5000/websocket",
    SocketConstructor: WebSocket
};

export const MClient = new DDP(options);

