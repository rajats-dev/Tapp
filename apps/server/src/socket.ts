import { Server } from "socket.io";
import MessageController from "./controllers/message.controller.js";

export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};

const userSocketMap: { [key: string]: string } = {};

export function setupSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    const userId = socket.handshake.query.userId as string;
    if (userId) userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("message", async (data) => {
      console.log("Server Side Message", data);

      const { senderId, receiverId, body } = data;
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", data);
      }
      await MessageController.sendMessageFromSocket(senderId, receiverId, body);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnect:", socket.id);

      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
}
