import { Request, Response } from "express";
import prisma from "../config/db.config.js";

class MessageController {
  static async sendMessageFromSocket(
    senderId: string,
    receiverId: string,
    message: string
  ) {
    try {
      if (!senderId && !receiverId && !message) {
        console.log("Value are undefined");
        return;
      }

      let conversation = await prisma.conversation.findFirst({
        where: {
          participantIds: {
            hasEvery: [senderId, receiverId],
          },
        },
      });

      // the very first message is being sent, that's why we need to create a new conversation
      if (!conversation) {
        conversation = await prisma.conversation.create({
          data: {
            participantIds: {
              set: [senderId, receiverId],
            },
          },
        });
      }

      const newMessage = await prisma.message.create({
        data: {
          senderId,
          body: message,
          conversationId: conversation.id,
        },
      });

      if (newMessage) {
        conversation = await prisma.conversation.update({
          where: {
            id: conversation.id,
          },
          data: {
            messages: {
              connect: {
                id: newMessage.id,
              },
            },
          },
        });
      }
    } catch (error) {
      console.error("Error in sendMessage: ", error.message);
    }
  }

  static async getMessage(req: Request, res: Response) {
    try {
      const { id: userToChatId } = req.params;
      const senderId = req.user.id;

      const conversation = await prisma.conversation.findFirst({
        where: {
          participantIds: {
            hasEvery: [senderId, userToChatId],
          },
        },
        include: {
          messages: {
            include: {
              sender: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  profilePic: true,
                },
              },
            },
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });

      if (!conversation) {
        return res.status(200).json([]);
      }
      res.status(200).json(conversation.messages);
    } catch (error) {
      console.error("Error in sendMessage: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getUsersForSidebar(req: Request, res: Response) {
    try {
      const authUserId = req.user.id;
      const users = await prisma.user.findMany({
        where: {
          id: {
            not: authUserId,
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          profilePic: true,
        },
      });

      res.status(200).json(users);
    } catch (error) {
      console.error("Error in getUsersForSidebar: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default MessageController;
