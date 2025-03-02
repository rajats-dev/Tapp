import { Server, Socket } from "socket.io";
import MessageController from "./controllers/message.controller.js";
import GroupController from "./controllers/group.controller.js";
import redis from "./config/redis.config.js";

export const getReceiverSocketId = async (receiverId: string) => {
  const cachedSocketId = await redis.get(`${receiverId}`);
  return JSON.parse(cachedSocketId);
};

const getGroupMembers = async (groupId: string) => {
  const cachedMembers = await redis.get(`group:${groupId}`);
  if (cachedMembers) return JSON.parse(cachedMembers);
  const members = await GroupController.getGroupMember(groupId);
  await redis.set(`group:${groupId}`, JSON.stringify(members), "EX", 18000); // Cache for 5 hours in seconds
  return members;
};

export function setupSocket(io: Server) {
  const sendMessage = async (data: any) => {
    console.log("Server Side Message", data);
    const { senderId, receiverId, body } = data;

    const receiverSocketId = await getReceiverSocketId(receiverId);
    console.log("----", receiverSocketId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", data);
    }
    MessageController.sendMessageFromSocket(senderId, receiverId, body);
  };

  const sendGroupMessages = async (payload: any) => {
    const { id, role, senderId, groupId, body, memberName } = payload;
    const member = await getGroupMembers(groupId);
    const memberList = member?.filter(
      (list: any) => list.memberId !== senderId
    );

    const socketIds = await Promise.all(
      memberList.map((member: any) => getReceiverSocketId(member.memberId))
    );
    // console.log("id----", socketIds);
    socketIds.filter(Boolean).forEach((socketId: string) => {
      io.to(socketId).emit("recieve-group-message", payload);
    });

    GroupController.sendGroupMessage(
      id,
      role,
      senderId,
      groupId,
      body,
      memberName
    );
  };

  const disconnect = async (socket: Socket, userId: string) => {
    console.log("User Disconnect:", socket.id);

    await redis.srem(redisKey, userId);
    // Emit updated list of online users
    const onlineUsers = await redis.smembers(redisKey);
    io.emit("getOnlineUsers", onlineUsers);
  };

  const redisKey = "onlineUsers";

  io.on("connection", async (socket) => {
    console.log("User Connected:", socket.id);

    const userId = socket.handshake.query.userId as string;
    if (userId) {
      await redis.set(userId, JSON.stringify(socket.id));
      await redis.sadd(redisKey, userId);
    }

    const onlineUsersMap = await redis.smembers(redisKey);
    io.emit("getOnlineUsers", onlineUsersMap);
    socket.on("groupMessage", sendGroupMessages);
    socket.on("message", sendMessage);
    socket.on("disconnect", () => disconnect(socket, userId));
  });
}
