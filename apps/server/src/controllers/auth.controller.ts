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
  // static async signup(req: Request, res: Response) {
  //   try {
  //     const { fullName, username, password, confirmPassword, gender } =
  //       req.body;

  //     if (!fullName || !username || !password || !confirmPassword || !gender) {
  //       return res.status(400).json({ error: "Please fill in all fields" });
  //     }

  //     if (password !== confirmPassword) {
  //       return res.status(400).json({ error: "Passwords don't match" });
  //     }

  //     const user = await prisma.user.findUnique({ where: { username } });

  //     if (user) {
  //       return res.status(400).json({ error: "Username already exists" });
  //     }
  //     const salt = await bcryptjs.genSalt(10);
  //     const hashedPassword = await bcryptjs.hash(password, salt);

  //     const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  //     const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

  //     const newUser = await prisma.user.create({
  //       data: {
  //         fullName,
  //         username,
  //         password: hashedPassword,
  //         gender,
  //         profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
  //       },
  //     });

  //     if (newUser) {
  //       // generate token in a sec
  //       generateToken(newUser.id, res);

  //       res.status(201).json({
  //         id: newUser.id,
  //         fullName: newUser.fullName,
  //         username: newUser.username,
  //         profilePic: newUser.profilePic,
  //       });
  //     } else {
  //       res.status(400).json({ error: "Invalid user data" });
  //     }
  //   } catch (error) {
  //     console.log("Error in signup controller", error.message);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // }

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

      res.status(200).json({
        message: "Logged in successfully!",
        user: { ...findUser, token: `Bearer ${token}` },
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
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const isPasswordCorrect = await bcryptjs.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      generateToken(user.id, res);

      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      });
    } catch (error) {
      console.log("Error in login controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default AuthController;
