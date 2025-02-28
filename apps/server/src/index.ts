import express, { Application, Request, Response } from "express";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import groupRoutes from "./routes/group.routes.js";

import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupSocket } from "./socket.js";
import redis from "./config/redis.config.js";
import { createAdapter } from "@socket.io/redis-streams-adapter";

const app: Application = express();
const PORT = process.env.PORT || 7000;

// * Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Replace with your frontend domain
    credentials: true,
  })
);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL],
  },
  adapter: createAdapter(redis),
});

setupSocket(io);
export { io };

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/group", groupRoutes);

app.get("/", (req: Request, res: Response) => {
  return res.send("It's working 🙌");
});

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
