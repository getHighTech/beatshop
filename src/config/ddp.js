import DDP from "ddp.js";
const options = {
// <<<<<<< HEAD
// //    endpoint: "ws:/127.0.0.1:5000/websocket",
//     // endpoint: "ws:/p.10000cars.cn:8085/websocket",//for test
//      endpoint: "ws:/p.10000cars.cn/websocket",//for production
// =======
    // endpoint: "ws:/127.0.0.1:5000/websocket",
    // endpoint: "ws:/p.10000cars.cn:8085/websocket",//for test
    endpoint: "ws:/p.10000cars.cn/websocket",//for production
// >>>>>>> 0d0b64627af7b29b08857cdfd6fc7fbd419c0cb9
    SocketConstructor:  WebSocket

};

export const MClient = new DDP(options);
