import DDP from "ddp.js";
const options = {

    endpoint: "ws:/127.0.0.1:5000/websocket",
    // endpoint: "ws:/p.10000cars.cn:8085/websocket",//for test
    // endpoint: "ws:/p.10000cars.cn/websocket",//for production
    SocketConstructor:  WebSocket

};

export const MClient = new DDP(options);
