import DDP from "ddp.js";
const options = {
    endpoint: "ws:/p.10000cars.cn/websocket",
    SocketConstructor: WebSocket
};

export const MClient = new DDP(options);

