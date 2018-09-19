import DDP from "ddp.js";

const options = {
//
    // endpoint: "ws:/p.10000cars.cn:8085/websocket",//for test

    endpoint: "ws:/p.10000cars.cn/websocket",//for production
    //  endpoint: "ws:/localhost:5000/websocket",
     SocketConstructor:  WebSocket

 };

 export const MClient = new DDP(options);
