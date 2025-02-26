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
    const { senderId, groupId, body, memberName } = payload;

    console.log(senderId, groupId, body);
    const member = await GroupController.getGroupMember(groupId);
    // console.log("member---", member);

    const memberList = member?.filter((list) => list.memberId !== senderId);

    if (memberList) {
      memberList.forEach((member) => {
        const memberScoketId = getReceiverSocketId(member.memberId);
        if (memberScoketId) {
          io.to(memberScoketId).emit("recieve-group-message", payload);
        }
      });
    }

    await GroupController.sendGroupMessage(senderId, groupId, body, memberName);
  };

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    const userId = socket.handshake.query.userId as string;
    if (userId) userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on("groupMessage", sendGroupMessages);
    socket.on("message", sendMessage);
    socket.on("disconnect", () => disconnect(socket, userId));
  });
}
