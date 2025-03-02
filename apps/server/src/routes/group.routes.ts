import { Router } from "express";
import GroupController from "../controllers/group.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = Router();

router.get("/fetchGroup", protectRoute, GroupController.getGroups);
router.get(
  "/fetchGroupMessage/:id",
  protectRoute,
  GroupController.getGroupMessages
);
router.get("/joinedGroup", protectRoute, GroupController.joinedGroup);
router.post("/createGroup", protectRoute, GroupController.createGroup);
router.post("/joinGroup", protectRoute, GroupController.joinGroup);
router.delete("/deleteGroup/:id", protectRoute, GroupController.deleteGroup);
router.delete(
  "/deleteGroupMessage/:id",
  protectRoute,
  GroupController.deleteGroupMessage
);
router.get(
  "/currentMember/:id",
  protectRoute,
  GroupController.getCurrentMember
);

export default router;
