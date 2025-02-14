import { Router } from "express";
import protectRoute from "../middleware/protectRoute.js";
import MessageController from "../controllers/message.controller.js";

const router = Router();

router.get(
  "/conversations",
  protectRoute,
  MessageController.getUsersForSidebar
);
router.get("/:id", protectRoute, MessageController.getMessage);
router.post("/send/:id", protectRoute, MessageController.sendMessage);

export default router;
