import { MemberRole } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../config/db.config.js";
import { v4 as uuidv4 } from "uuid";

class GroupController {
  static async createGroup(req: Request, res: Response) {
    try {
      const { name, userName } = req.body;
      const creatorId = req.user.id;

      const group = await prisma.groups.create({
        data: {
          name: name,
          creatorId: creatorId,
          inviteCode: uuidv4(),
          groupMember: {
            create: [
              {
                memberName: userName,
                memberId: creatorId,
                role: MemberRole.ADMIN,
              },
            ],
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

  static async joinGroup(req: Request, res: Response) {
    try {
      const { inviteCode } = req.body;
      const userId = req.user.id;
      const name = req.user.name;
      const existingGroup = await prisma.groups.findFirst({
        where: {
          inviteCode: inviteCode,
          groupMember: {
            some: {
              memberId: userId,
            },
          },
        },
      });
      if (existingGroup) {
        return res.status(200).json([existingGroup]);
      }

      const group = await prisma.groups.update({
        where: {
          inviteCode: inviteCode,
        },
        data: {
          groupMember: {
            create: [
              {
                memberName: name,
                memberId: userId,
              },
            ],
          },
        },
      });
      if (!group) {
        return res.status(200).json([]);
      }
      return res.status(200).json([group]);
    } catch (error) {
      console.log("Error in join group", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async joinedGroup(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const guestGroups = await prisma.groups.findMany({
        where: {
          groupMember: {
            some: {
              memberId: userId,
              role: "GUEST",
            },
          },
        },
        // include: {
        //   groupMember: true, // Include members if needed
        // },
      });

      console.log(guestGroups);

      if (!guestGroups) {
        return res.status(200).json([]);
      }
      return res.status(200).json(guestGroups);
    } catch (error) {
      console.log("Error in join group", error.message);
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

      return res.status(200).json(groups);
    } catch (error) {
      console.error("Error in getting member: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getGroupMessages(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const messages = await prisma.groupMessage.findMany({
        where: {
          groupId: id,
        },
      });

      if (!messages) {
        return res.status(200).json([]);
      }

      return res.status(200).json(messages || []);
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
