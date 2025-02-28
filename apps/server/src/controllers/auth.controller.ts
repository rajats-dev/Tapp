import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";

interface LoginPayloadType {
  name: string;
  email: string;
  provider: string;
  oauth_id: string;
  profilePic: string;
}

class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      console.log(name, email, password);
      if (!name || !password || !email) {
        return res.status(400).json({ error: "Please fill in all fields" });
      }

      const user = await prisma.user.findUnique({ where: { email } });

      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const profilePic = `https://avatar.iran.liara.run/username?username=${name}`;

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          profilePic,
        },
      });

      if (newUser) {
        res.status(201).json({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          profilePic: newUser.profilePic,
        });
      } else {
        res.status(400).json({ error: "Invalid user data" });
      }
    } catch (error) {
      console.log("Error in signup controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async outhLogin(req: Request, res: Response) {
    try {
      const body: LoginPayloadType = req.body;

      let findUser = await prisma.user.findUnique({
        where: { email: body.email },
      });

      if (!findUser) {
        findUser = await prisma.user.create({
          data: body,
        });
      }

      let JWTPayload = {
        id: findUser.id,
        name: body.name,
        email: body.email,
      };

      const token = jwt.sign(JWTPayload, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });

      let filteObj = {
        id: findUser.id,
        name: findUser.name,
        email: findUser.email,
        provider: findUser.provider,
        oauth_id: findUser.oauth_id,
        profilePic: findUser.profilePic,
        createdAt: findUser.createdAt,
        updatedAt: findUser.updatedAt,
      };

      res.status(200).json({
        message: "Logged in successfully!",
        user: { ...filteObj, token: `Bearer ${token}` },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { password, email } = req.body;
      const findUser = await prisma.user.findUnique({ where: { email } });

      if (!findUser) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const isPasswordCorrect = await bcryptjs.compare(
        password,
        findUser.password
      );

      if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      let JWTPayload = {
        id: findUser.id,
        name: findUser.name,
        email: email,
        password: password,
      };

      const token = jwt.sign(JWTPayload, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });

      res.status(200).json({
        message: "Logged in successfully!",
        user: { ...findUser, token: `Bearer ${token}` },
      });
    } catch (error) {
      console.log("Error in login controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default AuthController;
