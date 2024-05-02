import { Server } from "socket.io";
// @ts-ignore
let io;

export const socket = {
  // @ts-ignore
  init: (httpServer) => {
    io = new Server(httpServer, {
      cors: {
        origin: "http://localhost:3000",
      },
    });
    return io;
  },
  getIo: () => {
    // @ts-ignore
    if (!io) {
      throw new Error("Socket.io not initialized");
    }
    return io;
  },
};
