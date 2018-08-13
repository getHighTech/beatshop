import DDP from "ddp.js";
const options = {

    endpoint: "ws:/localhost:5000/websocket",
    // endpoint: "ws:/p.10000cars.cn:8085/websocket",//for test

    SocketConstructor:  WebSocket

};

export const MClient = new DDP(options);
