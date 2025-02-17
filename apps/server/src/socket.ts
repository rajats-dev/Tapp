import { Server } from "socket.io";

export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};

const userSocketMap: { [key: string]: string } = {};

export function setupSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log("Socket Connected", socket.id);

    const userId = socket.handshake.query.userId as string;
    if (userId) userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("user Disconnect", socket.id);

      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
}
