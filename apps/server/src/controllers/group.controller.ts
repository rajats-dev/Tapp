import { MemberRole } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../config/db.config.js";

class GroupController {
  static async createGroup(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const creatorId = req.user.id;

      const group = await prisma.groups.create({
        data: {
          name: name,
          creatorId: creatorId,
          groupMember: {
            create: [{ memberId: creatorId, role: MemberRole.ADMIN }],
          },
        },
      });

      if (!group) {
        return res.status(200).json([]);
      }

      return res.status(200).json([group]);
    } catch (error) {
      console.log("Error in creating group", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteGroup(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await prisma.groups.findUnique({
        where: {
          id: id,
        },
      });

      if (!data) {
        return res.status(404).json({ message: "Group Not Found!" });
      }

      await prisma.groups.delete({
        where: {
          id: id,
        },
      });
      return res.status(200).json({ message: "Group Deleted Successfully!" });
    } catch (error) {
      console.log("Error in creating group", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getGroups(req: Request, res: Response) {
    try {
      const creatorId = req.user.id;

      const groups = await prisma.groups.findMany({
        where: {
          creatorId: creatorId,
        },
        include: {
          groupMember: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });

      if (!groups) {
        return res.status(200).json([]);
      }

      return res.status(200).json(groups || []);
    } catch (error) {
      console.error("Error in getting member: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getGroupMember(groupId: string) {
    try {
      const member = await prisma.groupMember.findMany({
        where: {
          groupId: groupId,
        },
        include: {
          member: true,
        },
      });

      return member;
    } catch (error) {
      console.error("Error in getting member: ", error.message);
    }
  }

  static async sendGroupMessage(
    senderId: string,
    groupId: string,
    body: string
  ) {
    try {
      if (!senderId && !groupId && !body) {
        console.log("Value are undefined");
        return;
      }

      const newMessage = await prisma.groupMessage.create({
        data: {
          body: body,
          senderId: senderId,
          groupId: groupId,
        },
      });

      if (newMessage) {
        await prisma.groups.update({
          where: {
            id: groupId,
          },
          data: {
            groupMessage: {
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
}

export default GroupController;
