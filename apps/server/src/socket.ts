import { Server, Socket } from "socket.io";
import MessageController from "./controllers/message.controller.js";
import GroupController from "./controllers/group.controller.js";

export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};

const userSocketMap: { [key: string]: string } = {};

export function setupSocket(io: Server) {
  const sendMessage = async (data: any) => {
    console.log("Server Side Message", data);

    const { senderId, receiverId, body } = data;
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", data);
    }
    await MessageController.sendMessageFromSocket(senderId, receiverId, body);
  };

  const disconnect = (socket: Socket, userId: string) => {
    console.log("User Disconnect:", socket.id);

    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  };

  const sendGroupMessages = async (payload: any) => {
    const { senderId, groupId, body } = payload;

    const member = await GroupController.getGroupMember(groupId);
    console.log("member---", member);

    if (member) {
      member.forEach((member) => {
        const memberScoketId = getReceiverSocketId(member.memberId);
        if (memberScoketId) {
          io.to(memberScoketId).emit("recieve-group-message", payload);
        }
      });
    }

    await GroupController.sendGroupMessage(senderId, groupId, body);
  };

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    const userId = socket.handshake.query.userId as string;
    if (userId) userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on("message", sendGroupMessages);
    // socket.on("message", sendMessage);
    socket.on("disconnect", () => disconnect(socket, userId));
  });
}
