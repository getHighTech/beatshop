import DDP from "ddp.js";
const options = {
    endpoint: "ws:/p.10000cars.cn/websocket",//for production
    // endpoint: "ws:/localhost:5000/websocket",//for dev
    SocketConstructor: WebSocket
};

export const MClient = new DDP(options);

